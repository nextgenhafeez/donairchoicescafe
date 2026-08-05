#!/usr/bin/env bash
# Open an interactive mongosh session using the URI in backend/.env
# Usage:  bash connect.sh
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then echo "backend/.env not found. Copy .env.example -> .env first."; exit 1; fi
# shellcheck disable=SC1091
set -a; source .env; set +a

if [[ "$MONGODB_URI" == *"<DB_USERNAME>"* || "$MONGODB_URI" == *"<DB_PASSWORD>"* ]]; then
  echo "MONGODB_URI still has a placeholder. Edit backend/.env and set the real username/password."
  exit 1
fi

exec mongosh "$MONGODB_URI"
