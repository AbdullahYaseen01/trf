# Deployment & GitHub

## Push this project to GitHub (do it yourself)

Use these commands from your computer. Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and the repo name you want.

### 1. Open terminal in the project folder

```powershell
cd d:\job\ivr\ivr\ivr-reservation-system-master
```

### 2. Initialize Git (only if this folder is not already a Git repo)

```powershell
git init
```

### 3. Stage all files

```powershell
git add .
```

### 4. First commit

```powershell
git commit -m "Initial commit: Laravel IVR reservation system"
```

### 5. Create the repo on GitHub

- Go to [github.com](https://github.com) → **New repository**
- Choose a name (e.g. `ivr-reservation-system`)
- Do **not** add a README, .gitignore, or license (you already have them)
- Click **Create repository**

### 6. Add GitHub as remote and push

Copy the repo URL from GitHub (e.g. `https://github.com/YOUR_USERNAME/ivr-reservation-system.git`), then run:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

If GitHub asks for login, use a **Personal Access Token** as the password (Settings → Developer settings → Personal access tokens).

---

## Deploying this app (Laravel + PHP)

**Vercel does not support PHP/Laravel.** It is built for Node.js, static sites, and frameworks like Next.js. This project is Laravel (PHP), so use one of these instead:

| Option | Best for |
|--------|----------|
| **[Railway](https://railway.app)** | Easy PHP/Laravel deploy, free tier. This repo includes a `Dockerfile` so Railway builds correctly. |
| **[Render](https://render.com)** | PHP Web Service, free tier |
| **[Laravel Forge](https://forge.laravel.com)** + any VPS | Full control, paid |
| **Shared hosting** (e.g. cPanel) | Cheap, upload via Git or FTP |

After you push to GitHub, you can connect the same repo to Railway or Render and they will build and run your Laravel app.

---

## After cloning on a server

Whoever deploys or clones the repo should run:

```bash
cp .env.example .env
# Edit .env with real APP_KEY, DB_*, APP_URL
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force
php artisan config:cache
```

For local dev, use `composer install` (with dev deps) and `php artisan serve`.

---

## Troubleshooting (Railway / production)

### "Call to undefined method Illuminate\Foundation\Application::register()"

This happens when the app uses Laravel 11–style bootstrap (`$app->register()` in `bootstrap/app.php`) but the framework is Laravel 10. This repo uses Laravel 10; providers are in `config/app.php`, not in `bootstrap/app.php`.

- **Fix:** Redeploy from this repo (main branch). In Railway: **Settings** → **Build** → clear build cache (or trigger a new deploy). Ensure no other branch or local file overwrote `bootstrap/app.php` with Laravel 11 style.

### "OpenSSL Error" or "ssl connection has been shutdown"

Usually an external API call (e.g. token URL) failing over SSL in production.

- **Fix:** Set `APP_DEBUG=false` and `APP_URL` to your live URL (e.g. `https://trf-production-xxxx.up.railway.app`) in Railway **Variables**. If the app uses an external API, set its URL and credentials in Variables and ensure the API allows requests from your deployment host.

### Production env vars (Railway Variables)

Set at least:

- `APP_KEY` (from `php artisan key:generate --show` or let the container generate it)
- `APP_DEBUG=false`
- `APP_URL=https://your-railway-domain.up.railway.app`
- `DB_CONNECTION=sqlite` and `DB_DATABASE=/app/database/database.sqlite` (or add Postgres and set `DATABASE_URL`)
