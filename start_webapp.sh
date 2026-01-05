#!/usr/bin/env bash
set -euo pipefail

SERVER_URL="http://localhost:3000"

if ! command -v curl >/dev/null 2>&1; then
  echo "Error: curl no está instalado. Instálalo para continuar." >&2
  exit 1
fi

if curl --silent --fail --head "$SERVER_URL" >/dev/null; then
  echo "Servidor detectado en $SERVER_URL. Iniciando la webapp..."
  npm run dev
else
  echo "No se pudo conectar al servidor en $SERVER_URL. Asegúrate de que esté en ejecución antes de iniciar la webapp." >&2
  exit 1
fi
