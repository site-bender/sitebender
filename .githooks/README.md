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

- Strict FP checks for Architect and Pagewright (no classes, no mutation, etc.)
- Alias import guard (enforces import policy)
- "No React junk" linter (forbidden props/patterns)
- Coverage-ignore audit (blocks unexplained `deno-coverage-ignore`)

Requirements:

- Deno must be available in PATH

Notes:

- The tracked `pre-commit` file is executable and will run across environments.
