#!/usr/bin/env bash
# Setup TLS certificates for development using mkcert

set -e

echo "Setting up development TLS certificates with mkcert..."

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null; then
    echo "❌ mkcert is not installed."
    echo ""
    echo "Please install mkcert:"
    echo ""
    echo "macOS:    brew install mkcert nss"
    echo "Linux:    apt install mkcert nss-tools"
    echo "Windows:  choco install mkcert"
    echo ""
    echo "Or visit: https://github.com/FiloSottile/mkcert"
    exit 1
fi

# Install local CA
echo "Installing local CA..."
mkcert -install

# Generate certificates
echo "Generating certificates for app.localhost..."
cd "$(dirname "$0")/certs"
mkcert -cert-file app.localhost.pem \
       -key-file app.localhost-key.pem \
       app.localhost localhost 127.0.0.1 ::1

echo "✅ Certificates generated successfully!"
echo ""
echo "Generated files:"
echo "  - app.localhost.pem (certificate)"
echo "  - app.localhost-key.pem (private key)"
echo ""
echo "You can now start the dev servers with: docker-compose up"
