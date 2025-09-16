#!/usr/bin/env bash
# Prevent --no-verify from being used with git via shell alias.
# This script is intended to be invoked through an alias like:
#   alias git='/Users/guy/Workspace/@sitebender/sitebender/scripts/preventNoVerify/index.sh'
#
# Behavior:
# - Strips any occurrence of --no-verify from the arguments (for all subcommands)
# - Additionally strips -n only when the subcommand is `commit` (since -n there == --no-verify)
# - Passes through all other arguments unchanged to the real git executable
# - Prints a brief notice to stderr when it blocks these flags

set -euo pipefail

# Determine the git subcommand (first non-option arg, skipping args for -c/-C)
subcmd=""
skip_next=0
for arg in "$@"; do
  if [[ -z "$subcmd" ]]; then
    if (( skip_next )); then
      skip_next=0
      continue
    fi
    case "$arg" in
      -c|-C)
        # These global options take a following argument; skip that next one when searching for subcommand
        skip_next=1
        continue
        ;;
      --*)
        # Some other global long option (doesn't take a positional we need to special-case here)
        ;;
      -*)
        # Some other global short option(s)
        ;;
      *)
        subcmd="$arg"
        ;;
    esac
  fi
done

# Filter arguments: remove --no-verify always, and -n only for `git commit`
filtered_args=()
for arg in "$@"; do
  case "$arg" in
    --no-verify)
      echo "You may not use --no-verify. Hooks will run. Fix the issues and try again." >&2
      continue
      ;;
    -n)
      if [[ "$subcmd" == "commit" ]]; then
        echo "You may not use -n/--no-verify for 'git commit'. Hooks will run. Fix the issues and try again." >&2
        continue
      fi
      ;;
  esac
  filtered_args+=("$arg")
done

# Delegate to the real git binary found in PATH. Using /usr/bin/env avoids alias recursion.
exec /usr/bin/env git "${filtered_args[@]}"

