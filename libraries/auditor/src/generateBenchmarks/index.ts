import type { FunctionSignature } from "../types/index.ts"
import type { BenchmarkSuite } from "./types/index.ts"

import createBenchmarkInputs from "./createBenchmarkInputs/index.ts"
import detectBenchmarkPatterns from "./detectBenchmarkPatterns/index.ts"
import generatePerformanceTests from "./generatePerformanceTests/index.ts"

/**
 * Generates performance benchmark tests for a function
 * Pure function that creates various benchmark scenarios
 * @param signature - The function signature to benchmark
 * @param sourceCode - The source code for pattern analysis
 * @returns Benchmark suite with performance tests
 * @example
 * const benchmarks = generateBenchmarks(signature, sourceCode)
 * // Returns: { functionName: "map", benchmarks: [...] }
 */
export default function generateBenchmarks(
	signature: FunctionSignature,
	sourceCode: string,
): BenchmarkSuite {
	const patterns = detectBenchmarkPatterns(signature, sourceCode)
	const inputs = createBenchmarkInputs(signature, patterns)
	const benchmarks = generatePerformanceTests(signature, inputs)

	return {
		functionName: signature.name,
		functionPath: signature.path,
		benchmarks,
	}
}
