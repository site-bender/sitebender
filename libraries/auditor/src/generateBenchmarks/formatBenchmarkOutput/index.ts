import type { BenchmarkResult } from "../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
