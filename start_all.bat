@echo off
title Zk-CredLock: Zero-Knowledge Decentralized Identity Engine Launcher
color 0a

echo ===============================================================================
echo                ZK-CREDLOCK DECENTRALIZED IDENTITY ENGINE
echo       Groth16 zk-SNARKs, BN254 Pairings, & Poseidon Merkle State Commitments
echo           Pillai HOC College of Engineering & Technology (Autonomous)
echo ===============================================================================
echo.

cd /d "%~dp0"

echo [*] Checking for stale port allocations (8004, 3003)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8004" ^| findstr "LISTENING"') do (
    echo [*] Terminating lingering process on port 8004 (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3003" ^| findstr "LISTENING"') do (
    echo [*] Terminating lingering process on port 3003 (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo [*] Launching FastAPI Cryptographic Engine on http://127.0.0.1:8004...
start "Zk-CredLock Backend" cmd /k "cd /d %~dp0backend && python -m uvicorn api:app --host 127.0.0.1 --port 8004"

echo [*] Launching Next.js Dual-Theme Workbench on http://localhost:3003...
start "Zk-CredLock Frontend" cmd /k "cd /d %~dp0frontend && npm run start"

timeout /t 2 /nobreak >nul

echo.
echo ===============================================================================
echo  Zk-CredLock System Online!
echo  - Web Dashboard:  http://localhost:3003
echo  - REST API:       http://127.0.0.1:8004
echo  - Swagger Docs:   http://127.0.0.1:8004/docs
echo  - Defense PDF:    http://127.0.0.1:8004/api/defense-pdf
echo ===============================================================================
echo.
pause
