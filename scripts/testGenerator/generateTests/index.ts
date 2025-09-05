import type { TestSuite, GeneratorConfig, TestCase, BranchPath } from "../types/index.ts"
import parseSignature from "../parseSignature/index.ts"
import generatePropertyTests from "../generatePropertyTests/index.ts"
import writeTestFile from "../writeTestFile/index.ts"
import { needsCurriedHandling, transformTestCase } from "../handleCurriedFunctions/index.ts"
import generateEdgeCases from "./generateEdgeCases/index.ts"
import generateBranchTests from "./generateBranchTests/index.ts"
import _validateAndImproveCoverage from "./validateAndImproveCoverage/index.ts"
import generateImports from "./generateImports/index.ts"
import deduplicateTests from "../optimizer/deduplicateTests/index.ts"
import generateToolkitPatternTests from "../patterns/toolkitPatterns/index.ts"
import analyzeBranches from "../analyzeBranches/index.ts"
import generateBenchmarks from "../generateBenchmarks/index.ts"

export default async function generateTests(
	functionPath: string,
	config?: Partial<GeneratorConfig>
): Promise<TestSuite> {
	const finalConfig: GeneratorConfig = {
		maxPropertyRuns: config?.maxPropertyRuns ?? 100,
		includeEdgeCases: config?.includeEdgeCases ?? true,
		includePropertyTests: config?.includePropertyTests ?? true,
		includeBenchmarks: config?.includeBenchmarks ?? false,
		targetCoverage: config?.targetCoverage ?? 100,
	}
	
	console.log(`🔍 Analyzing function: ${functionPath}`)
	
	const signature = parseSignature(functionPath)
	
	if (!signature) {
		throw new Error(`Could not parse function signature from ${functionPath}`)
	}
	
	console.log(`📝 Function: ${signature.name}`)
	console.log(`   Parameters: ${signature.parameters.length}`)
	console.log(`   Return type: ${signature.returnType.raw}`)
	console.log(`   Is curried: ${signature.isCurried}`)
	
	// Read source code for branch analysis
	let sourceCode = ""
	try {
		sourceCode = await Deno.readTextFile(functionPath)
	} catch (error) {
		console.warn(`⚠️  Could not read source file: ${error}`)
	}
	
	// Analyze branches in the source code
	const branches: Array<BranchPath> = sourceCode 
		? analyzeBranches(signature, sourceCode)
		: []
	console.log(`🌳 Found ${branches.length} branches`)
	
	// Generate benchmarks if requested
	if (finalConfig.includeBenchmarks && sourceCode) {
		const benchmarkSuite = generateBenchmarks(signature, sourceCode)
		console.log(`⚡ Generated ${benchmarkSuite.benchmarks.length} benchmark tests`)
		// Note: Benchmarks are generated but not included in test cases
		// They would be written to a separate benchmark file
	}
	
	const allTests: Array<TestCase> = []
	
	if (finalConfig.includeEdgeCases) {
		const edgeCases = generateEdgeCases(signature)
		// Transform edge cases for curried functions
		const transformedEdgeCases = needsCurriedHandling(signature)
			? edgeCases.map(test => transformTestCase(test, signature))
			: edgeCases
		allTests.push(...transformedEdgeCases)
		console.log(`🔧 Generated ${transformedEdgeCases.length} edge case tests`)
	}
	
	if (finalConfig.includePropertyTests) {
		const propertyTests = generatePropertyTests(signature)
		allTests.push(...propertyTests)
		console.log(`🔬 Generated ${propertyTests.length} property-based tests`)
	}
	
	const branchTests = needsCurriedHandling(signature) 
		? generateBranchTests(branches, signature).map(test => transformTestCase(test, signature))
		: generateBranchTests(branches, signature)
	allTests.push(...branchTests)
	console.log(`🎯 Generated ${branchTests.length} branch coverage tests`)
	
	const patternTests = generateToolkitPatternTests(signature)
	allTests.push(...patternTests)
	console.log(`🔮 Generated ${patternTests.length} pattern-based tests`)
	
	const optimizedTests = deduplicateTests(allTests)
	console.log(`🎨 Optimized from ${allTests.length} to ${optimizedTests.length} tests`)
	
	const testFilePath = writeTestFile(
		functionPath,
		signature.name,
		optimizedTests,
		signature
	).then(path => {
		console.log(`✍️  Wrote test file: ${path}`)
		return path
	})
	
	const coverage = testFilePath.then(path =>
		_validateAndImproveCoverage(
			functionPath,
			path,
			allTests,
			signature.name,
			finalConfig
		)
	)
	
	return Promise.all([testFilePath, coverage]).then(([_path, coverageResult]) => {
		console.log(`📊 Coverage: ${coverageResult.percentage.toFixed(1)}%`)
		console.log(`   Lines: ${coverageResult.lines.covered}/${coverageResult.lines.total}`)
		console.log(`   Branches: ${coverageResult.branches.covered}/${coverageResult.branches.total}`)
		
		if (coverageResult.percentage < finalConfig.targetCoverage) {
			console.log(`⚠️  Coverage below target (${finalConfig.targetCoverage}%)`)
			
			if (coverageResult.lines.uncovered.length > 0) {
				console.log(`   Uncovered lines: ${coverageResult.lines.uncovered.join(", ")}`)
			}
			if (coverageResult.suggestions && coverageResult.suggestions.length > 0) {
				console.log(`   Suggestions:`)
				coverageResult.suggestions.forEach(suggestion => {
					console.log(`     • ${suggestion}`)
				})
			}
		} else {
			console.log(`✅ Target coverage achieved!`)
		}
		
		const testSuite: TestSuite = {
			functionPath,
			functionName: signature.name,
			testCases: optimizedTests,
			imports: generateImports(signature, optimizedTests),
			coverage: coverageResult,
		}
		
		return testSuite
	})
}