#!/usr/bin/env bash
#
# Test script for SSE endpoint
# Tests the Server-Sent Events endpoint at /events
#

set -euo pipefail

ENDPOINT="${SSE_ENDPOINT:-https://localhost:4433/events}"

echo "Testing SSE endpoint: $ENDPOINT"
echo "================================================"
echo ""
echo "Connect to SSE stream and wait for reload events..."
echo "To trigger a reload event, modify a file in /app/dist"
echo "Press Ctrl+C to exit"
echo ""

# Test SSE connection with curl
# --insecure: Accept self-signed certificates
# --no-buffer: Disable buffering to see events in real-time
# -N: Disable buffering (compatibility flag)
curl --insecure --no-buffer -N "$ENDPOINT"
