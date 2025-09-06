# Git Hooks (.githooks)

This repository uses a tracked hooks directory and sets:

```
core.hooksPath = .githooks
```

If hooks aren’t running, enable them locally:

```
deno task setup    # or: git config core.hooksPath .githooks
```

The `pre-commit` hook enforces repository standards:

- Strict FP checks for Engine and Components (no classes, no mutation, etc.)
- Alias import guard (enforces import policy)
- "No React junk" linter (forbidden props/patterns)
- Coverage-ignore audit (blocks unexplained `deno-coverage-ignore`)

Requirements:

- Deno must be available in PATH

Skip flags (use sparingly and only when necessary):

- `SKIP_FP_CHECKS=1` — Skips all FP checks and exits the hook early
- `SKIP_ALIAS_GUARD=1` — Skips alias import guard only

Examples:

```
# Skip all FP checks for an emergency commit
SKIP_FP_CHECKS=1 git commit -m "chore: emergency commit"

# Skip only alias guard
SKIP_ALIAS_GUARD=1 git commit -m "chore: commit while offline"
```

Notes:

- The toolkit commit restriction (ALLOW_TOOLKIT) has been removed.
- The tracked `pre-commit` file is executable and will run across environments.
