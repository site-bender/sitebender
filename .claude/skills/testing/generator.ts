//++ Generator for test files
//++ Creates test scaffolding with sections and property-based test templates

import type { TestConfig, TestCase } from "./types.ts"

//++ Generates complete test file
export default function generateTest(config: TestConfig): string {
	const { functionName, functionPath, description } = config

	const imports = _generateImports(functionPath)(functionName)
	const testBlock = _generateTestBlock(functionName)(config)(description)

	return `${imports}

${testBlock}
`
}

//++ Generates import statements
function _generateImports(functionPath: string) {
	return function generateImportsForPath(functionName: string): string {
		return `import { assert, assertEquals, fail } from "@std/assert"

import ${functionName} from "${functionPath}"`
	}
}

//++ Generates main test block
function _generateTestBlock(functionName: string) {
	return function generateTestBlockForFunction(config: TestConfig) {
		return function generateTestBlockForFunctionAndConfig(
			description?: string,
		): string {
			const sections = _generateTestSections(config)
			const propertyTests = config.includePropertyTests
				? _generatePropertyTestTemplates(functionName)
				: ""

			const descComment = description
				? `//++ ${description}\n`
				: `//++ Tests for ${functionName}\n`

			return `${descComment}Deno.test("${functionName}", async (t) => {
${sections}${propertyTests}
})`
		}
	}
}

//++ Generates test sections (happy path, edge cases, errors)
function _generateTestSections(config: TestConfig): string {
	const { testCases, includeErrorTests } = config

	const happyPathSection = _generateHappyPathSection(testCases)
	const edgeCaseSection = _generateEdgeCaseSection()
	const errorSection = includeErrorTests ? _generateErrorSection() : ""

	return `${happyPathSection}

${edgeCaseSection}${errorSection}`
}

//++ Generates happy path test section
function _generateHappyPathSection(
	testCases?: ReadonlyArray<TestCase>,
): string {
	const cases = testCases
		? testCases.map(_generateTestCase).join("\n\n\t\t")
		: _generatePlaceholderTest()

	return `\tawait t.step("happy path", async (t) => {
		${cases}
	})`
}

//++ Generates single test case
function _generateTestCase(testCase: TestCase): string {
	const { description, input, expected } = testCase

	return `await t.step("${description}", () => {
			const result = ${input}
			assertEquals(result, ${expected})
		})`
}

//++ Generates placeholder test
function _generatePlaceholderTest(): string {
	return `await t.step("TODO: add test case", () => {
			// TODO: Implement test
			throw new Error("Test not implemented")
		})`
}

//++ Generates edge case section
function _generateEdgeCaseSection(): string {
	return `\tawait t.step("edge cases", async (t) => {
		await t.step("TODO: add edge case test", () => {
			// TODO: Test edge cases (empty input, boundary values, etc.)
			throw new Error("Test not implemented")
		})
	})`
}

//++ Generates error path section
function _generateErrorSection(): string {
	return `

\tawait t.step("error paths", async (t) => {
		await t.step("TODO: test error case", () => {
			// TODO: Test error handling (Result/Validation error cases)
			// import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"
			// const result = functionName(invalidInput)
			// fold<ErrorType, void>(
			//   (error) => assertEquals(error.code, expectedCode)
			// )(
			//   (_value) => fail("Expected Error but got Ok")
			// )(result)
			throw new Error("Test not implemented")
		})
	})`
}

//++ Generates property-based test templates
function _generatePropertyTestTemplates(functionName: string): string {
	return `

	await t.step("property-based tests", async (t) => {
		await t.step("TODO: add property test", () => {
			// TODO: Import fast-check and add property-based tests
			// import * as fc from "npm:fast-check"
			//
			// fc.assert(
			//   fc.property(fc.integer(), (input) => {
			//     const result = ${functionName}(input)
			//     // Assert invariants that should hold for all inputs
			//     return true
			//   })
			// )
			throw new Error("Test not implemented")
		})
	})`
}
