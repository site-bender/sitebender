import type { FunctionSignature } from "../types/index.ts"
import type { BenchmarkSuite } from "./types/index.ts"

import createBenchmarkInputs from "./createBenchmarkInputs/index.ts"
import detectBenchmarkPatterns from "./detectBenchmarkPatterns/index.ts"
import generatePerformanceTests from "./generatePerformanceTests/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
