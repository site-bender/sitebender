/**
 * Type definitions for coverage gate functionality
 *
 * Following CLAUDE.md rules:
 * - Named exports for types and constants
 * - Immutable with readonly properties
 * - JSDoc with examples for each type
 */

/**
 * Represents coverage metrics for a single file analyzed by Deno coverage
 *
 * Used when parsing coverage output to extract file-specific metrics.
 * Both branch and line percentages range from 0 to 100.
 *
 * @example
 * ```typescript
 * const result: CoverageResult = {
 *   file: "engine/src/rendering/index.ts",
 *   branchPercent: 95.5,
 *   linePercent: 100.0
 * }
 * ```
 */
export type CoverageResult = {
  /** File path relative to project root */
  readonly file: string
  /** Branch coverage percentage (0-100) */
  readonly branchPercent: number
  /** Line coverage percentage (0-100) */
  readonly linePercent: number
}

/**
 * A specific coverage issue identified during validation
 *
 * Represents a single file that fails to meet coverage requirements.
 * Used to provide detailed feedback about what needs to be fixed.
 *
 * @example
 * ```typescript
 * const issue: CoverageIssue = {
 *   file: "engine/src/rendering/index.ts",
 *   issue: "Line coverage below 100%",
 *   current: 94.4,
 *   required: 100
 * }
 * ```
 */
export type CoverageIssue = {
  /** File path with the issue */
  readonly file: string
  /** Description of the coverage issue */
  readonly issue: string
  /** Current coverage percentage */
  readonly current: number
  /** Required coverage percentage */
  readonly required: number
}

/**
 * Result of coverage validation against 100% requirements
 *
 * Contains the overall pass/fail status and detailed information about
 * any coverage gaps found during validation.
 *
 * @example
 * ```typescript
 * const result: CoverageGateResult = {
 *   passed: false,
 *   message: "Coverage gate failed: 2 issue(s) found",
 *   details: [
 *     {
 *       file: "engine/src/rendering/index.ts",
 *       issue: "Line coverage below 100%",
 *       current: 94.4,
 *       required: 100
 *     }
 *   ]
 * }
 * ```
 */
export type CoverageGateResult = {
  /** Whether all coverage requirements are met */
  readonly passed: boolean
  /** Human-readable status message */
  readonly message: string
  /** Detailed list of coverage issues found */
  readonly details: readonly CoverageIssue[]
}
