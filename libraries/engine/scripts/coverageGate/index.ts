#!/usr/bin/env -S deno run --allow-read --allow-run --allow-write
/**
 * Coverage Gate for @sitebender/engine
 *
 * Enforces 100% test coverage mandate as specified in TESTING.md and CLAUDE.md.
 * Fails the build if any public engine function lacks 100% coverage without
 * explicit ignore directives.
 *
 * This is the main entry point that can be executed directly or via deno task.
 *
 * @example
 * ```bash
 * # Direct execution
 * deno run --allow-read --allow-run --allow-write scripts/coverageGate/index.ts
 *
 * # Via task
 * deno task coverage-gate
 * ```
 */

import runCoverageGate from "./runCoverageGate/index.ts"

// Run the coverage gate if this script is executed directly
if (import.meta.main) {
	await runCoverageGate()
}

// Export for potential use as a module
export { default as runCoverageGate } from "./runCoverageGate/index.ts"
export { default as parseCoverageOutput } from "./parseCoverageOutput/index.ts"
export { default as validateCoverage } from "./validateCoverage/index.ts"
export { default as isEngineSourceFile } from "./isEngineSourceFile/index.ts"
export type * from "./types/index.ts"
