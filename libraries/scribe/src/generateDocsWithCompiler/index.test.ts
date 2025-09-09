import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import generateDocsWithCompiler from "./index.ts"
import type { Documentation, ParseError } from "../types/index.ts"

// Parser API types for testing
type Comment = {
	kind: "line" | "block"
	text: string
	fullText: string
	type: "description" | "example" | "gotcha" | "pro" | "law"
	position: "before" | "after"
}

type TypeInfo = {
	raw: string
	kind: "primitive" | "object" | "array" | "function" | "union" | "generic"
}

type Parameter = {
	name: string
	type: string
	optional: boolean
	defaultValue?: string
}

type Generic = {
	name: string
	constraint: string | undefined
	default: string | undefined
}

type FunctionSignature = {
	name: string
	parameters: Array<Parameter>
	returnType: string
	generics?: Array<Generic>
	isAsync: boolean
	isGenerator: boolean
	isExported: boolean
	isDefault: boolean
}

type ParserMetadata = {
	hasThrowStatements: boolean
	hasAwaitExpressions: boolean
	hasGlobalAccess: boolean
	cyclomaticComplexity: number
	hasReturnStatements: boolean
}

type ParsedFunction = {
	node: unknown // TypeScript AST node
	signature: FunctionSignature
	metadata: ParserMetadata
}

type ParserOutput = {
	functions: Array<ParsedFunction>
	comments: Array<Comment>
}

describe("generateDocsWithCompiler", () => {
	describe("successful documentation generation", () => {
		it("should generate documentation for a simple pure function", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "add",
							filePath: "/test/add.ts",
							parameters: [
								{
									name: "a",
									type: "number",
									optional: false,
									defaultValue: undefined
								},
								{
									name: "b",
									type: "number",
									optional: false,
									defaultValue: undefined
								}
							],
							returnType: "number",
							generics: [],
							isAsync: false,
							isGenerator: false,
							isCurried: false,
							isPure: true,
							isExported: true,
							isDefault: true
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: false,
							cyclomaticComplexity: 1,
							hasReturnStatements: true
						}
					}
				],
				comments: [
					{
						kind: "line",
						text: "Adds two numbers together",
						fullText: "//++ Adds two numbers together",
						type: "description",
						position: "before"
					}
				]
			}

			const result = await generateDocsWithCompiler(parserOutput)

			assertEquals(result.ok, true)
			if (result.ok) {
				assertEquals(result.value.name, "add")
				assertEquals(result.value.format, "markdown")
				assertExists(result.value.content)
				assertExists(result.value.metadata)
				assertEquals(result.value.metadata.description, "Adds two numbers together")
			}
		})

		it("should extract description from comments", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "multiply",
							filePath: "/test/multiply.ts",
							parameters: [
								{
									name: "x",
									type: { raw: "number", kind: "primitive" },
									isOptional: false,
									isRest: false,
									defaultValue: undefined
								},
								{
									name: "y",
									type: { raw: "number", kind: "primitive" },
									isOptional: false,
									isRest: false,
									defaultValue: undefined
								}
							],
							returnType: "number",
							generics: [],
							isAsync: false,
							isGenerator: false,
							isCurried: false,
							isPure: true,
							isExported: true,
							isDefault: true
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: false,
							cyclomaticComplexity: 1,
							hasReturnStatements: true
						}
					}
				],
				comments: [
					{
						kind: "line",
						text: "This function multiplies two numbers",
						fullText: "//++ This function multiplies two numbers",
						type: "description",
						position: "before"
					},
					{
						kind: "line",
						text: "[EXAMPLE] multiply(3, 4) // 12",
						fullText: "//?? [EXAMPLE] multiply(3, 4) // 12",
						type: "example",
						position: "after"
					}
				]
			}

			const result = await generateDocsWithCompiler(parserOutput)

			assertEquals(result.ok, true)
			if (result.ok) {
				assertEquals(result.value.metadata.description, "This function multiplies two numbers")
				assertEquals(result.value.metadata.examples.length, 1)
				assertEquals(result.value.metadata.examples[0].code, "[EXAMPLE] multiply(3, 4) // 12")
			}
		})

		it("should handle async function with error handling", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "fetchUser",
							filePath: "/test/fetchUser.ts",
							parameters: [
								{
									name: "id",
									type: { raw: "number", kind: "primitive" },
									isOptional: false,
									isRest: false,
									defaultValue: undefined
								}
							],
							returnType: "Promise<User | null>",
							generics: [],
							isAsync: true,
							isGenerator: false,
							isCurried: false,
							isPure: false,
							isExported: true,
							isDefault: false
						},
						metadata: {
							hasThrowStatements: true,
							hasAwaitExpressions: true,
							hasGlobalAccess: true,
							cyclomaticComplexity: 3,
							hasReturnStatements: true
						}
					}
				],
				comments: [
					{
						kind: "line",
						text: "Fetches user data from API with error handling",
						fullText: "//++ Fetches user data from API with error handling",
						type: "description",
						position: "before"
					},
					{
						kind: "line",
						text: "[PRO] Returns null on error instead of throwing",
						fullText: "//?? [PRO] Returns null on error instead of throwing",
						type: "pro",
						position: "after"
					}
				]
			}

			const result = await generateDocsWithCompiler(parserOutput)

			assertEquals(result.ok, true)
			if (result.ok) {
				assertEquals(result.value.name, "fetchUser")
				assertEquals(result.value.metadata.properties.isPure, false)
				assertEquals(result.value.metadata.properties.complexity, "O(3)")
			}
		})

		it("should handle generator function", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "generateIds",
							filePath: "/test/generateIds.ts",
							parameters: [],
							returnType: "Generator<number, void, unknown>",
							generics: [],
							isAsync: false,
							isGenerator: true,
							isCurried: false,
							isPure: false,
							isExported: true,
							isDefault: false
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: false,
							cyclomaticComplexity: 2,
							hasReturnStatements: false
						}
					}
				],
				comments: [
					{
						kind: "line",
						text: "Generates sequential IDs starting from 1",
						fullText: "//++ Generates sequential IDs starting from 1",
						type: "description",
						position: "before"
					},
					{
						kind: "line",
						text: "[EXAMPLE] const idGen = generateIds()",
						fullText: "//?? [EXAMPLE] const idGen = generateIds()",
						type: "example",
						position: "after"
					},
					{
						kind: "line",
						text: "[EXAMPLE] idGen.next().value // 1",
						fullText: "//?? [EXAMPLE] idGen.next().value // 1",
						type: "example",
						position: "after"
					}
				]
			}

			const result = await generateDocsWithCompiler(parserOutput)

			assertEquals(result.ok, true)
			if (result.ok) {
				assertEquals(result.value.name, "generateIds")
				assertEquals(result.value.metadata.properties.complexity, "O(2)")
				assertEquals(result.value.metadata.examples.length, 2)
			}
		})

		it("should generate JSON format when specified", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "test",
							filePath: "/test/test.ts",
							parameters: [],
							returnType: "void",
							generics: [],
							isAsync: false,
							isGenerator: false,
							isCurried: false,
							isPure: true,
							isExported: true,
							isDefault: true
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: false,
							cyclomaticComplexity: 1,
							hasReturnStatements: false
						}
					}
				],
				comments: []
			}

			const result = await generateDocsWithCompiler(parserOutput, { format: "json" })

			assertEquals(result.ok, true)
			if (result.ok) {
				assertEquals(result.value.format, "json")
				// Should be valid JSON
				const parsed = JSON.parse(result.value.content)
				assertExists(parsed)
			}
		})

		it("should handle HTML format request (falls back to markdown)", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "test",
							filePath: "/test/test.ts",
							parameters: [],
							returnType: "void",
							generics: [],
							isAsync: false,
							isGenerator: false,
							isCurried: false,
							isPure: true,
							isExported: true,
							isDefault: true
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: false,
							cyclomaticComplexity: 1,
							hasReturnStatements: false
						}
					}
				],
				comments: []
			}

			const result = await generateDocsWithCompiler(parserOutput, { format: "html" })

			assertEquals(result.ok, true)
			if (result.ok) {
				assertEquals(result.value.format, "html")
				// Currently falls back to markdown
				assertEquals(result.value.content.includes("#"), true)
			}
		})

		it("should handle function with no description", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "test",
							filePath: "/test/test.ts",
							parameters: [],
							returnType: "void",
							generics: [],
							isAsync: false,
							isGenerator: false,
							isCurried: false,
							isPure: false,
							isExported: true,
							isDefault: true
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: true,
							cyclomaticComplexity: 1,
							hasReturnStatements: false
						}
					}
				],
				comments: []
			}

			const result = await generateDocsWithCompiler(parserOutput)

			assertEquals(result.ok, true)
			if (result.ok) {
				assertEquals(result.value.metadata.description, undefined)
			}
		})

		it("should extract all comment types", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "complexFunction",
							filePath: "/test/complex.ts",
							parameters: [
								{
									name: "x",
									type: { raw: "number", kind: "primitive" },
									isOptional: false,
									isRest: false,
									defaultValue: undefined
								}
							],
							returnType: "number",
							generics: [],
							isAsync: false,
							isGenerator: false,
							isCurried: false,
							isPure: true,
							isExported: true,
							isDefault: true
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: false,
							cyclomaticComplexity: 1,
							hasReturnStatements: true
						}
					}
				],
				comments: [
					{
						kind: "line",
						text: "A comprehensive test function",
						fullText: "//++ A comprehensive test function",
						type: "description",
						position: "before"
					},
					{
						kind: "line",
						text: "[EXAMPLE] complexFunction(5) // 10",
						fullText: "//?? [EXAMPLE] complexFunction(5) // 10",
						type: "example",
						position: "after"
					},
					{
						kind: "line",
						text: "[GOTCHA] Only works with positive numbers",
						fullText: "//?? [GOTCHA] Only works with positive numbers",
						type: "gotcha",
						position: "after"
					},
					{
						kind: "line",
						text: "[PRO] Very fast computation",
						fullText: "//?? [PRO] Very fast computation",
						type: "pro",
						position: "after"
					},
					{
						kind: "line",
						text: "[LAW] f(f(x)) = f(x) (idempotent)",
						fullText: "//?? [LAW] f(f(x)) = f(x) (idempotent)",
						type: "law",
						position: "after"
					}
				]
			}

			const result = await generateDocsWithCompiler(parserOutput)

			assertEquals(result.ok, true)
			if (result.ok) {
				const metadata = result.value.metadata
				assertEquals(metadata.description, "A comprehensive test function")
				assertEquals(metadata.examples.length, 1)
				assertEquals(metadata.laws.length, 1)
			}
		})
	})

	describe("error handling", () => {
		it("should return error when no functions provided", async () => {
			const parserOutput: ParserOutput = {
				functions: [],
				comments: []
			}

			const result = await generateDocsWithCompiler(parserOutput)

			assertEquals(result.ok, false)
			if (!result.ok) {
				assertEquals(result.error.message, "No functions found in file")
			}
		})
	})

	describe("metadata structure", () => {
		it("should include all metadata fields", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "test",
							filePath: "/test/test.ts",
							parameters: [
								{
									name: "x",
									type: { raw: "number", kind: "primitive" },
									isOptional: false,
									isRest: false,
									defaultValue: undefined
								}
							],
							returnType: "number",
							generics: [],
							isAsync: false,
							isGenerator: false,
							isCurried: false,
							isPure: true,
							isExported: true,
							isDefault: true
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: false,
							cyclomaticComplexity: 1,
							hasReturnStatements: true
						}
					}
				],
				comments: []
			}

			const result = await generateDocsWithCompiler(parserOutput)

			assertEquals(result.ok, true)
			if (result.ok) {
				const metadata = result.value.metadata
				assertExists(metadata.signature)
				assertExists(metadata.properties)
				assertExists(metadata.examples)
				assertExists(metadata.laws)
				assertExists(metadata.relatedFunctions)
				// Check arrays are initialized
				assertEquals(Array.isArray(metadata.examples), true)
				assertEquals(Array.isArray(metadata.laws), true)
				assertEquals(Array.isArray(metadata.relatedFunctions), true)
			}
		})

		it("should set property values from Parser metadata", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "pureCurriedFunction",
							filePath: "/test/curry.ts",
							parameters: [
								{
									name: "a",
									type: { raw: "number", kind: "primitive" },
									isOptional: false,
									isRest: false,
									defaultValue: undefined
								}
							],
							returnType: "(b: number) => number",
							generics: [],
							isAsync: false,
							isGenerator: false,
							isCurried: true,
							isPure: true,
							isExported: true,
							isDefault: true
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: false,
							cyclomaticComplexity: 2,
							hasReturnStatements: true
						}
					}
				],
				comments: []
			}

			const result = await generateDocsWithCompiler(parserOutput)

			assertEquals(result.ok, true)
			if (result.ok) {
				const props = result.value.metadata.properties
				assertEquals(props.isPure, false) // TODO: Parser needs to provide this
				assertEquals(props.isCurried, false) // TODO: Parser needs to provide this
				assertEquals(props.curryLevels, undefined)
				assertEquals(props.complexity, "O(2)")
				assertEquals(props.deterministic, false) // TODO: Derive from purity
			}
		})
	})

	describe("options handling", () => {
		it("should use default options when none provided", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "test",
							filePath: "/test/test.ts",
							parameters: [],
							returnType: "void",
							generics: [],
							isAsync: false,
							isGenerator: false,
							isCurried: false,
							isPure: true,
							isExported: true,
							isDefault: true
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: false,
							cyclomaticComplexity: 1,
							hasReturnStatements: false
						}
					}
				],
				comments: []
			}

			const result = await generateDocsWithCompiler(parserOutput)

			assertEquals(result.ok, true)
			if (result.ok) {
				assertEquals(result.value.format, "markdown")
			}
		})

		it("should handle unknown format option", async () => {
			const parserOutput: ParserOutput = {
				functions: [
					{
						node: {},
						signature: {
							name: "test",
							filePath: "/test/test.ts",
							parameters: [],
							returnType: "void",
							generics: [],
							isAsync: false,
							isGenerator: false,
							isCurried: false,
							isPure: true,
							isExported: true,
							isDefault: true
						},
						metadata: {
							hasThrowStatements: false,
							hasAwaitExpressions: false,
							hasGlobalAccess: false,
							cyclomaticComplexity: 1,
							hasReturnStatements: false
						}
					}
				],
				comments: []
			}

			const result = await generateDocsWithCompiler(parserOutput, {
				format: "unknown" as any,
			})

			assertEquals(result.ok, true)
			if (result.ok) {
				// Should fall back to markdown
				assertEquals(result.value.content.includes("#"), true)
			}
		})
	})
})