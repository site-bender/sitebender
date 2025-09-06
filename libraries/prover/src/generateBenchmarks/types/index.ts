export type BenchmarkTest = {
	name: string
	description: string
	input: Array<unknown>
	iterations: number
	warmupRuns: number
}

export type BenchmarkResult = {
	test: string
	averageTime: number
	minTime: number
	maxTime: number
	iterations: number
}

export type BenchmarkSuite = {
	functionName: string
	functionPath: string
	benchmarks: Array<BenchmarkTest>
}

export type ScaleInput = {
	baseSize: number
	scaleFactor: number
	maxSize: number
}
