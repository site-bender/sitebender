import type { CoverageResult } from "../types/index.ts"

/**
 * Parses Deno coverage output to extract coverage percentages for each file
 *
 * Takes the raw text output from `deno coverage` command and extracts
 * file paths with their branch and line coverage percentages.
 * Handles ANSI color codes that Deno includes in the output.
 *
 * @param output - Raw text output from `deno coverage` command
 * @returns Array of coverage results for each file found in the output
 *
 * @example
 * ```typescript
 * const output = `
 * | File                          | Branch % | Line % |
 * | ----------------------------- | -------- | ------ |
 * | engine/src/rendering/index.ts |     50.0 |   94.4 |
 * `
 * const results = parseCoverageOutput(output)
 * // [{ file: 'engine/src/rendering/index.ts', branchPercent: 50, linePercent: 94.4 }]
 * ```
 */
export default function parseCoverageOutput(output: string): CoverageResult[] {
  const lines = output.split('\n')
  const results: CoverageResult[] = []

  // Find the table rows (skip header and separator lines)
  const tableStart = lines.findIndex(line => line.includes('| File'))
  if (tableStart === -1) {
    return results // No coverage table found, return empty array
  }

  for (let i = tableStart + 2; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!line || line === '' || line.includes('All files')) {
      continue
    }

    // Parse table row by splitting on | and extracting parts
    if (line.includes('|') && !line.includes('File') && !line.includes('---')) {
      const parts = line.split('|').map(part =>
        part.trim()
          .replace(/\u001b\[[0-9;]*m/g, '') // Remove ANSI escape codes
          .trim()
      ).filter(part => part !== '')

      if (parts.length >= 3) {
        const file = parts[0]
        const branchPercent = parseFloat(parts[1])
        const linePercent = parseFloat(parts[2])

        if (!isNaN(branchPercent) && !isNaN(linePercent)) {
          results.push({
            file: file,
            branchPercent: branchPercent,
            linePercent: linePercent
          })
        }
      }
    }
  }

  return results
}
