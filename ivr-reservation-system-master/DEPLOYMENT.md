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
| **[Railway](https://railway.app)** | Easy PHP/Laravel deploy, free tier |
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
