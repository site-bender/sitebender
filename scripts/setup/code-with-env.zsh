#!/bin/zsh
# Launch VS Code with .env.local variables loaded into the environment.
# Usage:
#   zsh scripts/setup/code-with-env.zsh
# Requires the `code` command to be available (VS Code: Command Palette → "Shell Command: Install 'code' command").

set -euo pipefail

REPO_ROOT=$(cd -- "$(dirname -- "$0")"/../.. && pwd)
cd "$REPO_ROOT"

if [[ -f .env.local ]]; then
  # Export variables from .env.local into this shell (ignore commented/blank lines)
  set -a
  source <(grep -v '^#' .env.local | sed -E 's/^([^=]+)=(.*)$/export \1=\2/g')
  set +a
  echo "Loaded .env.local (vars exported)"
else
  echo ".env.local not found at $REPO_ROOT; continuing without it" >&2
fi

# Launch VS Code so the extension host inherits these environment variables
if command -v code >/dev/null 2>&1; then
  code .
else
  echo "VS Code 'code' CLI not found. Open VS Code, then install the command via:"
  echo "  Command Palette → 'Shell Command: Install \"code\" command in PATH'"
fi
