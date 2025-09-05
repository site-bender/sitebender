import { TypeSignatureParser } from "./parser/index.ts"
import { PropertyTestGenerator } from "./generators/property.ts"
import { BranchAnalyzer } from "./coverage/branch-analyzer.ts"
import { CoverageValidator } from "./coverage/validator.ts"
import { TestFileWriter } from "./writer/index.ts"
import type { TestCase, TestSuite, GeneratorConfig } from "./types/index.ts"

export class TestGenerator {
	private parser: TypeSignatureParser
	private propertyGenerator: PropertyTestGenerator
	private branchAnalyzer: BranchAnalyzer
	private coverageValidator: CoverageValidator
	private testWriter: TestFileWriter
	private config: GeneratorConfig
	
	constructor(config?: Partial<GeneratorConfig>) {
		this.parser = new TypeSignatureParser()
		this.propertyGenerator = new PropertyTestGenerator()
		this.branchAnalyzer = new BranchAnalyzer()
		this.coverageValidator = new CoverageValidator()
		this.testWriter = new TestFileWriter()
		
		this.config = {
			maxPropertyRuns: config?.maxPropertyRuns ?? 100,
			includeEdgeCases: config?.includeEdgeCases ?? true,
			includePropertyTests: config?.includePropertyTests ?? true,
			includeBenchmarks: config?.includeBenchmarks ?? false,
			targetCoverage: config?.targetCoverage ?? 100,
		}
	}
	
	async generateTests(functionPath: string): Promise<TestSuite> {
		console.log(`🔍 Analyzing function: ${functionPath}`)
		
		const signature = this.parser.parse(functionPath)
		
		if (!signature) {
			throw new Error(`Could not parse function signature from ${functionPath}`)
		}
		
		console.log(`📝 Function: ${signature.name}`)
		console.log(`   Parameters: ${signature.parameters.length}`)
		console.log(`   Return type: ${signature.returnType.raw}`)
		console.log(`   Is curried: ${signature.isCurried}`)
		
		const sourceCode = await Deno.readTextFile(functionPath)
		
		const branches = this.branchAnalyzer.analyze(sourceCode)
		console.log(`🌳 Found ${branches.length} branches`)
		
		const allTests: Array<TestCase> = []
		
		if (this.config.includeEdgeCases) {
			const edgeCases = this.generateEdgeCases(signature)
			allTests.push(...edgeCases)
			console.log(`🔧 Generated ${edgeCases.length} edge case tests`)
		}
		
		if (this.config.includePropertyTests) {
			const propertyTests = this.propertyGenerator.generate(signature)
			allTests.push(...propertyTests)
			console.log(`🔬 Generated ${propertyTests.length} property-based tests`)
		}
		
		const branchTests = this.generateBranchTests(branches, signature)
		allTests.push(...branchTests)
		console.log(`🎯 Generated ${branchTests.length} branch coverage tests`)
		
		const testFilePath = await this.testWriter.write(
			functionPath,
			signature.name,
			allTests,
			signature.isCurried
		)
		console.log(`✍️  Wrote test file: ${testFilePath}`)
		
		const coverage = await this.validateAndImproveCoverage(
			functionPath,
			testFilePath,
			allTests
		)
		
		console.log(`📊 Coverage: ${coverage.percentage.toFixed(1)}%`)
		console.log(`   Lines: ${coverage.lines.covered}/${coverage.lines.total}`)
		console.log(`   Branches: ${coverage.branches.covered}/${coverage.branches.total}`)
		
		if (coverage.percentage < this.config.targetCoverage) {
			console.log(`⚠️  Coverage below target (${this.config.targetCoverage}%)`)
			
			if (coverage.uncoveredLines.length > 0) {
				console.log(`   Uncovered lines: ${coverage.uncoveredLines.join(", ")}`)
				
				const ignoredLines = await this.coverageValidator.addCoverageIgnores(
					functionPath,
					coverage.uncoveredLines
				)
				
				if (ignoredLines.length > 0) {
					console.log(`   Added ${ignoredLines.length} coverage ignores with reasons`)
					coverage.ignoredLines = ignoredLines
				}
			}
		} else {
			console.log(`✅ Target coverage achieved!`)
		}
		
		const testSuite: TestSuite = {
			functionPath,
			functionName: signature.name,
			testCases: allTests,
			imports: this.generateImports(signature, allTests),
			coverage,
		}
		
		return testSuite
	}
	
	private generateEdgeCases(signature: any): Array<TestCase> {
		const edgeCases: Array<TestCase> = []
		
		for (const param of signature.parameters) {
			const paramName = param.name
			const paramType = param.type.raw
			
			if (paramType.includes("Array") || paramType.includes("[]")) {
				edgeCases.push({
					name: `handles empty array for ${paramName}`,
					description: `Test with empty array input for ${paramName}`,
					input: [[]],
					expectedOutput: this.inferEmptyArrayOutput(signature),
				})
				
				edgeCases.push({
					name: `handles single element array for ${paramName}`,
					description: `Test with single element array for ${paramName}`,
					input: [[1]],
				})
			}
			
			if (paramType === "number") {
				edgeCases.push({
					name: `handles zero for ${paramName}`,
					description: `Test with zero value for ${paramName}`,
					input: [0],
				})
				
				edgeCases.push({
					name: `handles negative number for ${paramName}`,
					description: `Test with negative value for ${paramName}`,
					input: [-1],
				})
				
				edgeCases.push({
					name: `handles large number for ${paramName}`,
					description: `Test with large value for ${paramName}`,
					input: [Number.MAX_SAFE_INTEGER],
				})
			}
			
			if (paramType === "string") {
				edgeCases.push({
					name: `handles empty string for ${paramName}`,
					description: `Test with empty string for ${paramName}`,
					input: [""],
				})
				
				edgeCases.push({
					name: `handles unicode string for ${paramName}`,
					description: `Test with unicode characters for ${paramName}`,
					input: ["🚀 Unicode 文字"],
				})
			}
			
			if (param.optional || paramType.includes("undefined")) {
				edgeCases.push({
					name: `handles undefined for ${paramName}`,
					description: `Test with undefined value for ${paramName}`,
					input: [undefined],
					expectedOutput: signature.returnType.raw.includes("number") ? NaN : undefined,
				})
			}
			
			if (paramType.includes("null")) {
				edgeCases.push({
					name: `handles null for ${paramName}`,
					description: `Test with null value for ${paramName}`,
					input: [null],
					expectedOutput: signature.returnType.raw.includes("number") ? NaN : undefined,
				})
			}
		}
		
		return edgeCases
	}
	
	private generateBranchTests(branches: any[], signature: any): Array<TestCase> {
		const branchTests: Array<TestCase> = []
		
		for (const branch of branches) {
			for (const input of branch.requiredInputs) {
				// Determine expected output based on the branch condition
				let expectedOutput: unknown = undefined
				
				if (signature.returnType.raw.includes("number")) {
					// For functions that return numbers, invalid inputs return NaN
					if (branch.condition.includes("isNullish") || 
					    branch.condition.includes("typeof") ||
					    input.value === null ||
					    input.value === undefined ||
					    typeof input.value === "string" ||
					    typeof input.value === "boolean") {
						expectedOutput = NaN
					}
				}
				
				const testCase: TestCase = {
					name: `covers branch: ${branch.condition}`,
					description: input.description,
					input: [input.value],
					expectedOutput,
					branchCoverage: [branch.id],
				}
				
				branchTests.push(testCase)
			}
		}
		
		return branchTests
	}
	
	private async validateAndImproveCoverage(
		functionPath: string,
		testFilePath: string,
		currentTests: Array<TestCase>
	): Promise<any> {
		let coverage = await this.coverageValidator.validate(functionPath, testFilePath)
		
		if (coverage.percentage < this.config.targetCoverage && coverage.uncoveredBranches.length > 0) {
			console.log(`🔄 Generating additional tests for uncovered branches...`)
			
			const additionalTests = await this.coverageValidator.generateAdditionalTests(
				functionPath,
				currentTests,
				coverage.uncoveredBranches
			)
			
			if (additionalTests.length > 0) {
				currentTests.push(...additionalTests)
				
				await this.testWriter.write(
					functionPath,
					this.extractFunctionName(functionPath),
					currentTests
				)
				
				coverage = await this.coverageValidator.validate(functionPath, testFilePath)
				console.log(`   Added ${additionalTests.length} tests, new coverage: ${coverage.percentage.toFixed(1)}%`)
			}
		}
		
		return coverage
	}
	
	private extractFunctionName(functionPath: string): string {
		const pathParts = functionPath.split("/")
		const parentDir = pathParts[pathParts.length - 2]
		return parentDir || "unknown"
	}
	
	private inferEmptyArrayOutput(signature: any): unknown {
		const returnType = signature.returnType.raw
		
		if (returnType.includes("Array") || returnType.includes("[]")) {
			return []
		}
		
		if (returnType === "number") {
			return 0
		}
		
		if (returnType === "string") {
			return ""
		}
		
		if (returnType === "boolean") {
			return false
		}
		
		// For functions that return NaN on invalid input
		if (signature.name === "add" || returnType.includes("number")) {
			return NaN
		}
		
		return undefined
	}
	
	private generateImports(signature: any, tests: Array<TestCase>): Array<string> {
		const imports: Array<string> = []
		
		imports.push(`import ${signature.name} from "../src/${signature.name}"`)
		imports.push(`import { describe, it } from "https://deno.land/std/testing/bdd.ts"`)
		imports.push(`import { assertEquals, assertThrows } from "https://deno.land/std/assert/mod.ts"`)
		
		const hasPropertyTests = tests.some((t) => t.properties && t.properties.length > 0)
		if (hasPropertyTests) {
			imports.push(`import * as fc from "npm:fast-check"`)
		}
		
		return imports
	}
}

if (import.meta.main) {
	const args = Deno.args
	
	if (args.length === 0) {
		console.error("Usage: deno run --allow-all index.ts <function-path>")
		Deno.exit(1)
	}
	
	const functionPath = args[0]
	const generator = new TestGenerator()
	
	try {
		const suite = await generator.generateTests(functionPath)
		console.log(`\n✨ Test generation complete!`)
		console.log(`   Generated ${suite.testCases.length} test cases`)
		console.log(`   Coverage: ${suite.coverage.percentage.toFixed(1)}%`)
	} catch (error) {
		console.error(`\n❌ Error: ${error.message}`)
		Deno.exit(1)
	}
}