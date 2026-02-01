# IVR Laravel - Full setup and start local server
# Run from project root: .\setup-and-serve.ps1

$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot
Set-Location $projectRoot

Write-Host "`n=== IVR Laravel Setup (step by step) ===" -ForegroundColor Cyan

# Resolve PHP: prefer 'php', else common paths
$phpExe = $null
if (Get-Command php -ErrorAction SilentlyContinue) { $phpExe = "php" }
else {
  $try = @(
    "C:\php\php.exe",
    "C:\xampp\php\php.exe",
    "C:\Program Files\PHP\php.exe",
    "$env:LOCALAPPDATA\Programs\PHP\php.exe"
  )
  foreach ($p in $try) {
    if (Test-Path $p) { $phpExe = $p; break }
  }
}
if (-not $phpExe) {
  Write-Host "ERROR: PHP not found. Install PHP and add it to PATH, or put php.exe in C:\php\." -ForegroundColor Red
  exit 1
}
Write-Host "Using PHP: $phpExe" -ForegroundColor Green

# Resolve Composer: prefer 'composer', else php composer.phar
$composerCmd = $null
if (Get-Command composer -ErrorAction SilentlyContinue) { $composerCmd = "composer" }
elseif (Test-Path "$projectRoot\composer.phar") { $composerCmd = "$phpExe `"$projectRoot\composer.phar`"" }
else {
  Write-Host "ERROR: Composer not found. Install Composer or place composer.phar in project root." -ForegroundColor Red
  exit 1
}
Write-Host "Using Composer: $composerCmd" -ForegroundColor Green

# --- Step 1: Composer install ---
Write-Host "`n[Step 1/4] Installing PHP dependencies (Composer)..." -ForegroundColor Yellow
Invoke-Expression "$composerCmd install"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Step 1 done.`n" -ForegroundColor Green

# --- Step 2: .env and app key ---
if (-not (Test-Path "$projectRoot\.env")) {
  Write-Host "[Step 2/4] Creating .env from .env.example..." -ForegroundColor Yellow
  Copy-Item "$projectRoot\.env.example" "$projectRoot\.env"
}
Write-Host "[Step 2/4] Generating application key..." -ForegroundColor Yellow
& $phpExe artisan key:generate --force
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Step 2 done.`n" -ForegroundColor Green

# --- Step 3: NPM install ---
Write-Host "[Step 3/4] Installing Node dependencies (npm)..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Step 3 done.`n" -ForegroundColor Green

# --- Step 4: Start server ---
Write-Host "[Step 4/4] Starting Laravel development server..." -ForegroundColor Yellow
Write-Host "Server will run at http://127.0.0.1:8000 (Ctrl+C to stop).`n" -ForegroundColor Cyan
& $phpExe artisan serve
