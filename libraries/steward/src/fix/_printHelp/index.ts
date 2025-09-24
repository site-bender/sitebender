/// <reference lib="deno.ns" />
// Private helper per privacy convention: folder and function both prefixed with underscore.

//++ Private helper: prints Steward fix help
export default function _printHelp(): void {
	console.log(`Steward (alpha) - Style/Shape enforcement (fix mode)

Usage:
  deno run -A libraries/steward/src/fix/index.ts [paths...] [--dry-run]

Notes:
  - Rule inventory and scope:
      docs/steward-rules.md
  - Planned behavior:
      * Deterministic, non-configurable safe autofixes
      * Runs deno fmt for stable printing
      * Re-checks, and exits non-zero if violations remain
`)
}
