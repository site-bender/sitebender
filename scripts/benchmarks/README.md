# Benchmarks

A small harness to snapshot a run between two commits/refs, record diff stats, elapsed time, and optionally run gates (typecheck, lint, test) and estimate GPT costs using the existing estimator.

## Quickstart

```sh
# Basic between previous commit and HEAD
deno run -A scripts/benchmarks/recordRun.ts \
  --label "imports-only cleanup in toolsmith/array"

# Explicit refs, run gates, and save JSON report
deno run -A scripts/benchmarks/recordRun.ts \
  --from abc1234 --to def5678 \
  --label "scripts step-1 in scripts/generate" \
  --check "deno task type-check" \
  --lint "deno task lint" \
  --test "deno task test" \
  --out reports/integrity/benchmarks.json

# Include a rough cost estimate (see scripts/estimate/gptCost.ts for options)
deno run -A scripts/benchmarks/recordRun.ts \
  --estimate "--in-rate 1.25 --out-rate 10 --cached-in-rate 0.125 --cached-in-share 0.7 --light 30 --medium 10 --heavy 2" \
  --out reports/integrity/benchmarks.json
```

Notes:
- Uses zsh non-login, non-interactive shell to run commands.
- If `--out` is provided, JSON will be saved; otherwise printed to stdout.
- `--from` defaults to `HEAD~1`, `--to` defaults to `HEAD`.
