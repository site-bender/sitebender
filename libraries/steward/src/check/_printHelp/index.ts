/// <reference lib="deno.ns" />
// Internal helper: prints CLI help for Steward check mode.
// Private helper per privacy convention: src/check/_printHelp/index.ts

//++ Private helper: prints Steward check help
export default function _printHelp(): void {
	console.log(`Steward (alpha) - Style/Shape enforcement (check mode)

Usage:
  deno run -A libraries/steward/src/check/index.ts [paths...]

Notes:
  - Rule inventory and scope:
      docs/steward-rules.md
  - Planned behavior:
      * Deterministic, non-configurable checks
      * JSON diagnostics + pretty output
      * Non-zero exit on violations
`)
}
