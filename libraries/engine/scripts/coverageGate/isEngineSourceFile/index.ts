/**
 * Determines if a file path represents engine source code that requires 100% coverage
 *
 * According to TESTING.md and CLAUDE.md, only public engine functions must have
 * 100% test coverage. This function identifies which files are considered
 * "engine source" vs external dependencies or test files.
 *
 * @param filePath - The file path to check (relative to project root)
 * @returns True if the file is engine source requiring 100% coverage
 *
 * @example
 * ```typescript
 * // Engine source files - require 100% coverage
 * isEngineSourceFile('engine/src/rendering/index.ts') // true
 * isEngineSourceFile('engine/src/reactive/signal/index.ts') // true
 *
 * // External dependencies - exempt from coverage requirements
 * isEngineSourceFile('toolkit/src/simple/string/escape/index.ts') // false
 *
 * // Test files - exempt from coverage requirements
 * isEngineSourceFile('engine/tests/behaviors/rendering/index.test.ts') // false
 * ```
 */
export default function isEngineSourceFile(filePath: string): boolean {
  // Only check files that start with 'engine/src/'
  // Exclude toolkit files and any test files
  return filePath.startsWith('engine/src/') &&
         !filePath.includes('test') &&
         !filePath.includes('spec') &&
         !filePath.startsWith('toolkit/')
}
