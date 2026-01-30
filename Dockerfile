# Laravel on Railway - PHP 8.2 with required extensions
FROM php:8.2-cli

# Install system deps and PHP extensions Laravel needs (libsqlite3-dev required for pdo_sqlite/sqlite3)
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite sqlite3 fileinfo mbstring xml zip bcmath \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /app

# Composer deps first (better layer cache)
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --ignore-platform-req=php

COPY . .

# Base .env (Railway injects real vars at runtime; .env is in .dockerignore)
RUN cp .env.example .env

RUN composer dump-autoload --optimize

# Storage and cache dirs (writable); SQLite file for default DB
RUN mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && touch database/database.sqlite

# Generate key at runtime if missing; run migrations; then serve
ENV PORT=8000
EXPOSE 8000
CMD php artisan key:generate --force 2>/dev/null || true && \
    php artisan migrate --force --no-interaction 2>/dev/null || true && \
    php artisan config:cache 2>/dev/null || true && \
    php artisan serve --host=0.0.0.0 --port=${PORT}
