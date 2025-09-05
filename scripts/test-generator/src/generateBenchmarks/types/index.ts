/**
 * Types for benchmark generation
 */

export interface BenchmarkSuite {
	functionName: string
	patterns: Array<string>
	inputs: BenchmarkInputSet
	tests: Array<BenchmarkTest>
	benchmarkCode: string
	expectedComplexity: string
	thresholds: Record<string, number>
}

export interface BenchmarkTest {
	name: string
	category: 'micro' | 'comparison' | 'complexity' | 'regression'
	inputSize: 'small' | 'medium' | 'large' | 'scaled'
	setup: string
	benchmark: string
	expectedTime?: number
	comparedTo?: string
}

export interface BenchmarkInputSet {
	small: Array<unknown>
	medium: Array<unknown>
	large: Array<unknown>
	scaled: Array<{ size: number, input: unknown }>
	realistic: Array<unknown>
}

export interface BenchmarkPattern {
	name: string
	detected: boolean
	confidence: number
	reasoning: string
	suggestedBenchmarks: Array<string>
}