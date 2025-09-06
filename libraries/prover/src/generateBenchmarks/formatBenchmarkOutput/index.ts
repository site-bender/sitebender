import type { BenchmarkResult } from "../types/index.ts"

/**
 * Formats benchmark results into readable output
 * Pure function that creates human-readable benchmark reports
 * @param results - Array of benchmark results
 * @param functionName - Name of the benchmarked function
 * @returns Formatted string representation of results
 * @example
 * const output = formatBenchmarkOutput(results, "map")
 * // Returns: "Benchmark Results for map\n..."
 */
export default function formatBenchmarkOutput(
	results: Array<BenchmarkResult>,
	functionName: string,
): string {
	const header = `Benchmark Results for ${functionName}`
	const separator = "=".repeat(header.length)

	const formattedResults = results.map((result) => {
		const avgTime = result.averageTime.toFixed(4)
		const minTime = result.minTime.toFixed(4)
		const maxTime = result.maxTime.toFixed(4)

		return `
Test: ${result.test}
  Iterations: ${result.iterations}
  Average: ${avgTime}ms
  Min: ${minTime}ms
  Max: ${maxTime}ms`
	}).join("\n")

	return `${header}
${separator}
${formattedResults}
${separator}`
}
