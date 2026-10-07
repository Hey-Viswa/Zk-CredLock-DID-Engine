#!/usr/bin/env bash

# Zk-CredLock macOS / Linux One-Click Startup Script
# Pillai HOC College of Engineering & Technology (Autonomous)
# Blockchain & Applied Cryptography Laboratory

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

echo "==============================================================================="
echo "               ZK-CREDLOCK DECENTRALIZED IDENTITY ENGINE"
echo "      Groth16 zk-SNARKs, BN254 Pairings & Poseidon Merkle State Commitments"
echo "          Pillai HOC College of Engineering & Technology (Autonomous)"
echo "==============================================================================="
echo ""

# 1. Check Python
if command -v python3 >/dev/null 2>&1; then
    PYTHON_CMD="python3"
elif command -v python >/dev/null 2>&1; then
    PYTHON_CMD="python"
else
    echo "❌ Error: Python 3 is not installed or not in PATH."
    echo "Please install Python from https://www.python.org/ or via 'brew install python'."
    exit 1
fi

# 2. Check Node & npm
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
    echo "❌ Error: Node.js / npm is not installed or not in PATH."
    echo "Please install Node.js from https://nodejs.org/ or via 'brew install node'."
    exit 1
fi

echo "✅ Environment Verified:"
echo "   - Python: $($PYTHON_CMD --version)"
echo "   - Node:   $(node --version)"
echo "   - npm:    $(npm --version)"
echo ""

# 3. Clean stale port allocations (8004, 3003) on macOS / Linux
echo "[*] Checking and freeing ports 8004 and 3003..."
lsof -ti:8004 | xargs kill -9 2>/dev/null || true
lsof -ti:3003 | xargs kill -9 2>/dev/null || true

# 4. Prepare Backend Virtual Environment (Handles macOS PEP 668)
echo "[*] Setting up Backend Python environment..."
cd "$BACKEND_DIR"
if [ ! -d ".venv" ]; then
    echo "    Creating Python virtual environment in backend/.venv..."
    $PYTHON_CMD -m venv .venv
fi
source .venv/bin/activate
echo "    Installing/verifying backend dependencies..."
pip install -q -r requirements.txt

# 5. Prepare Frontend dependencies
echo "[*] Setting up Frontend dependencies..."
cd "$FRONTEND_DIR"
if [ ! -d "node_modules" ]; then
    echo "    Installing node_modules (first-time setup, might take 30s)..."
    npm install
fi

# 6. Trap EXIT and INT to gracefully terminate child processes on Ctrl+C
cleanup() {
    echo ""
    echo "[*] Shutting down Zk-CredLock services..."
    if [ -n "$BACKEND_PID" ]; then
        kill "$BACKEND_PID" 2>/dev/null || true
    fi
    if [ -n "$FRONTEND_PID" ]; then
        kill "$FRONTEND_PID" 2>/dev/null || true
    fi
    lsof -ti:8004 | xargs kill -9 2>/dev/null || true
    lsof -ti:3003 | xargs kill -9 2>/dev/null || true
    echo "✅ Shutdown complete."
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# 7. Launch Backend
echo ""
echo "[*] Launching FastAPI Cryptographic Microservice on http://127.0.0.1:8004..."
cd "$BACKEND_DIR"
source .venv/bin/activate
python -m uvicorn api:app --host 127.0.0.1 --port 8004 &
BACKEND_PID=$!

# Wait for backend to wake up
sleep 2

# 8. Launch Frontend
echo "[*] Launching Next.js Dual-Theme Workbench on http://localhost:3003..."
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to initialize
sleep 3

echo ""
echo "==============================================================================="
echo " 🚀 Zk-CredLock System Online!"
echo " - Web Dashboard:  http://localhost:3003"
echo " - REST API:       http://127.0.0.1:8004"
echo " - Swagger Docs:   http://127.0.0.1:8004/docs"
echo " - Defense PDF:    http://127.0.0.1:8004/api/defense-pdf"
echo "==============================================================================="
echo ""
echo "Press Ctrl+C at any time to stop both servers."

# 9. Open browser automatically on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    sleep 2
    open "http://localhost:3003" || true
fi

# Keep script running to maintain background jobs
wait
