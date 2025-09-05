/**
 * Format benchmark tests into Deno.bench compatible code
 */

import type { BenchmarkTest } from "../types/index.ts"

/**
 * Format benchmark tests into executable Deno benchmark code
 * @param functionName Name of the function being benchmarked
 * @param tests Array of benchmark tests
 * @returns Formatted benchmark code string
 */
export default function formatBenchmarkOutput(
	functionName: string,
	tests: Array<BenchmarkTest>
): string {
	const lines: Array<string> = []
	
	// File header
	lines.push('/**')
	lines.push(' * Auto-generated performance benchmarks')
	lines.push(` * Function: ${functionName}`)
	lines.push(` * Generated: ${new Date().toISOString()}`)
	lines.push(' * ')
	lines.push(' * Run with: deno bench --allow-all')
	lines.push(' */')
	lines.push('')
	
	// Import the function being tested
	lines.push(`import ${functionName} from "./index.ts"`)
	lines.push('')
	
	// Generate benchmark groups by category
	const categories = groupTestsByCategory(tests)
	
	for (const [category, categoryTests] of Object.entries(categories)) {
		if (categoryTests.length === 0) continue
		
		lines.push(`// ${category.toUpperCase()} BENCHMARKS`)
		lines.push('')
		
		for (const test of categoryTests) {
			lines.push(...formatSingleBenchmark(test))
			lines.push('')
		}
	}
	
	// Add comparison summary if we have comparison benchmarks
	const comparisonTests = tests.filter(t => t.category === 'comparison')
	if (comparisonTests.length > 0) {
		lines.push(...generateComparisonSummary(comparisonTests))
	}
	
	// Add complexity analysis if we have complexity benchmarks
	const complexityTests = tests.filter(t => t.category === 'complexity')
	if (complexityTests.length > 0) {
		lines.push(...generateComplexityAnalysis(complexityTests))
	}
	
	return lines.join('\n')
}

/**
 * Group tests by category for organized output
 */
function groupTestsByCategory(tests: Array<BenchmarkTest>): Record<string, Array<BenchmarkTest>> {
	const groups: Record<string, Array<BenchmarkTest>> = {
		micro: [],
		comparison: [],
		complexity: [],
		regression: []
	}
	
	for (const test of tests) {
		groups[test.category].push(test)
	}
	
	return groups
}

/**
 * Format a single benchmark test
 */
function formatSingleBenchmark(test: BenchmarkTest): Array<string> {
	const lines: Array<string> = []
	
	// Benchmark configuration
	const config: Array<string> = []
	
	if (test.expectedTime) {
		config.push(`baseline: true`)
	}
	
	const configStr = config.length > 0 ? `, { ${config.join(', ')} }` : ''
	
	// Benchmark declaration
	lines.push(`Deno.bench("${test.name}"${configStr}, () => {`)
	
	// Setup code (indented)
	if (test.setup && test.setup.trim()) {
		const setupLines = test.setup.split('\n')
		for (const line of setupLines) {
			if (line.trim()) {
				lines.push(`\t${line.trim()}`)
			}
		}
		lines.push('')
	}
	
	// Benchmark code (indented)
	const benchmarkLines = test.benchmark.split('\n')
	for (const line of benchmarkLines) {
		if (line.trim()) {
			lines.push(`\t${line.trim()}`)
		}
	}
	
	lines.push('})') 
	
	return lines
}

/**
 * Generate comparison summary comments
 */
function generateComparisonSummary(comparisonTests: Array<BenchmarkTest>): Array<string> {
	const lines: Array<string> = []
	
	lines.push('/*')
	lines.push(' * COMPARISON ANALYSIS:')
	lines.push(' * ')
	
	// Group comparisons by what they're comparing
	const comparisonGroups: Record<string, Array<BenchmarkTest>> = {}
	
	for (const test of comparisonTests) {
		if (test.comparedTo) {
			const key = [test.comparedTo, test.name].sort().join(' vs ')
			if (!comparisonGroups[key]) {
				comparisonGroups[key] = []
			}
			comparisonGroups[key].push(test)
		}
	}
	
	for (const [comparison, tests] of Object.entries(comparisonGroups)) {
		lines.push(` * ${comparison}:`)
		lines.push(` *   - Run both benchmarks to compare performance`)
		lines.push(` *   - Expected: Implementation-dependent results`)
		lines.push(' * ')
	}
	
	lines.push(' * Use these results to:')
	lines.push(' * - Choose optimal implementation strategies')
	lines.push(' * - Validate performance assumptions')
	lines.push(' * - Identify performance bottlenecks')
	lines.push(' */')
	lines.push('')
	
	return lines
}

/**
 * Generate complexity analysis comments
 */
function generateComplexityAnalysis(complexityTests: Array<BenchmarkTest>): Array<string> {
	const lines: Array<string> = []
	
	lines.push('/*')
	lines.push(' * COMPLEXITY ANALYSIS:')
	lines.push(' * ')
	lines.push(' * These benchmarks test algorithmic scaling:')
	lines.push(' * ')
	
	// Analyze expected complexity patterns
	const sizePattern = extractSizePatterns(complexityTests)
	
	for (const pattern of sizePattern) {
		lines.push(` * Input size ${pattern.size}:`)
		lines.push(` *   - Expected time: ~${pattern.expectedTime}ms`)
		lines.push(` *   - Complexity: ${inferComplexityFromTests(pattern.size, pattern.expectedTime)}`)
		lines.push(' * ')
	}
	
	lines.push(' * Performance Expectations:')
	lines.push(' * - O(1): Constant time regardless of input size')
	lines.push(' * - O(n): Time scales linearly with input size')
	lines.push(' * - O(n log n): Time scales with n * log(n)')
	lines.push(' * - O(n²): Time scales quadratically (avoid for large inputs)')
	lines.push(' * ')
	lines.push(' * Red flags:')
	lines.push(' * - Times significantly higher than expected')
	lines.push(' * - Non-linear scaling for expected linear operations')
	lines.push(' * - Memory allocation spikes')
	lines.push(' */')
	lines.push('')
	
	return lines
}

/**
 * Extract size patterns from complexity tests
 */
function extractSizePatterns(tests: Array<BenchmarkTest>): Array<{ size: number, expectedTime: number }> {
	const patterns: Array<{ size: number, expectedTime: number }> = []
	
	for (const test of tests) {
		if (test.expectedTime) {
			// Try to extract size from test name
			const sizeMatch = test.name.match(/n=(\d+)/)
			if (sizeMatch) {
				patterns.push({
					size: parseInt(sizeMatch[1]),
					expectedTime: test.expectedTime
				})
			}
		}
	}
	
	// Sort by size
	patterns.sort((a, b) => a.size - b.size)
	
	return patterns
}

/**
 * Infer complexity class from size and time relationship
 */
function inferComplexityFromTests(size: number, expectedTime: number): string {
	const timePerUnit = expectedTime / size
	
	if (timePerUnit < 0.001) {
		return 'O(1) - Constant time'
	} else if (timePerUnit < 0.01) {
		return 'O(n) - Linear time'
	} else if (timePerUnit < 0.1) {
		return 'O(n log n) - Linearithmic time'
	} else {
		return 'O(n²) or worse - Quadratic+ time'
	}
}