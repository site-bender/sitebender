import type {
	BranchPath,
	GeneratorConfig,
	TestCase,
	TestSuite,
} from "../types/index.ts"
import type Logger from "../types/Logger/index.ts"
import createConsoleLogger from "../logger/createConsoleLogger/index.ts"
import parseSignature from "../parseSignature/index.ts"
import generatePropertyTests from "../generatePropertyTests/index.ts"
import writeTestFile from "../writeTestFile/index.ts"
import {
	needsCurriedHandling,
	transformTestCase,
} from "../handleCurriedFunctions/index.ts"
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
	config?: Partial<GeneratorConfig>,
): Promise<TestSuite> {
	const logger: Logger = config?.logger ?? createConsoleLogger()
	const finalConfig: GeneratorConfig = {
		maxPropertyRuns: config?.maxPropertyRuns ?? 100,
		includeEdgeCases: config?.includeEdgeCases ?? true,
		includePropertyTests: config?.includePropertyTests ?? true,
		includeBenchmarks: config?.includeBenchmarks ?? false,
		targetCoverage: config?.targetCoverage ?? 100,
		logger,
	}

	logger.log(`🔍 Analyzing function: ${functionPath}`)

	const signature = parseSignature(functionPath)

	if (!signature) {
		throw new Error(
			`Could not parse function signature from ${functionPath}`,
		)
	}

	logger.log(`📝 Function: ${signature.name}`)
	logger.log(`   Parameters: ${signature.parameters.length}`)
	logger.log(`   Return type: ${signature.returnType.raw}`)
	logger.log(`   Is curried: ${signature.isCurried}`)

	// Read source code for branch analysis
	const sourceCode = await (async () => {
		try {
			return await Deno.readTextFile(functionPath)
		} catch (error) {
			logger.warn(`⚠️  Could not read source file: ${error}`)
			return ""
		}
	})()

	// Analyze branches in the source code
	const branches: Array<BranchPath> = sourceCode
		? analyzeBranches(signature, sourceCode)
		: []
	logger.log(`🌳 Found ${branches.length} branches`)

	// Generate benchmarks if requested
	if (finalConfig.includeBenchmarks && sourceCode) {
		const benchmarkSuite = generateBenchmarks(signature, sourceCode)
		logger.log(
			`⚡ Generated ${benchmarkSuite.benchmarks.length} benchmark tests`,
		)
		// Note: Benchmarks are generated but not included in test cases
		// They would be written to a separate benchmark file
	}

	const allTests: Array<TestCase> = []

	if (finalConfig.includeEdgeCases) {
		const edgeCases = generateEdgeCases(signature)
		// Transform edge cases for curried functions
		const transformedEdgeCases = needsCurriedHandling(signature)
			? edgeCases.map((test) => transformTestCase(test, signature))
			: edgeCases
		allTests.push(...transformedEdgeCases)
		logger.log(
			`🔧 Generated ${transformedEdgeCases.length} edge case tests`,
		)
	}

	if (finalConfig.includePropertyTests) {
		const propertyTests = generatePropertyTests(signature)
		allTests.push(...propertyTests)
		logger.log(`🔬 Generated ${propertyTests.length} property-based tests`)
	}

	const branchTests = needsCurriedHandling(signature)
		? generateBranchTests(branches, signature).map((test) =>
			transformTestCase(test, signature)
		)
		: generateBranchTests(branches, signature)
	allTests.push(...branchTests)
	logger.log(`🎯 Generated ${branchTests.length} branch coverage tests`)

	const patternTests = generateToolkitPatternTests(signature)
	allTests.push(...patternTests)
	logger.log(`🔮 Generated ${patternTests.length} pattern-based tests`)

	const optimizedTests = deduplicateTests(allTests)
	logger.log(
		`🎨 Optimized from ${allTests.length} to ${optimizedTests.length} tests`,
	)

	const testFilePath = writeTestFile(
		functionPath,
		signature.name,
		optimizedTests,
		signature,
	).then((path) => {
		logger.log(`✍️  Wrote test file: ${path}`)
		return path
	})

	const coverage = testFilePath.then((path) =>
		_validateAndImproveCoverage(
			functionPath,
			path,
			allTests,
			signature.name,
			finalConfig,
		)
	)

	return Promise.all([testFilePath, coverage]).then(
		([_path, coverageResult]) => {
			logger.log(`📊 Coverage: ${coverageResult.percentage.toFixed(1)}%`)
			logger.log(
				`   Lines: ${coverageResult.lines.covered}/${coverageResult.lines.total}`,
			)
			logger.log(
				`   Branches: ${coverageResult.branches.covered}/${coverageResult.branches.total}`,
			)

			if (coverageResult.percentage < finalConfig.targetCoverage) {
				logger.warn(
					`⚠️  Coverage below target (${finalConfig.targetCoverage}%)`,
				)

				if (coverageResult.lines.uncovered.length > 0) {
					logger.log(
						`   Uncovered lines: ${
							coverageResult.lines.uncovered.join(", ")
						}`,
					)
				}
				if (
					coverageResult.suggestions &&
					coverageResult.suggestions.length > 0
				) {
					logger.log(`   Suggestions:`)
					coverageResult.suggestions.forEach((suggestion) => {
						logger.log(`     • ${suggestion}`)
					})
				}
			} else {
				logger.log(`✅ Target coverage achieved!`)
			}

			const testSuite: TestSuite = {
				functionPath,
				functionName: signature.name,
				testCases: optimizedTests,
				imports: generateImports(signature, optimizedTests),
				coverage: coverageResult,
			}

			return testSuite
		},
	)
}
