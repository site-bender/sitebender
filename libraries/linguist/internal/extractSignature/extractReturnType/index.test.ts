import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import * as typescript from "npm:typescript@5.7.2"

import { TypeKind } from "../../types/index.ts"
import extractReturnType from "./index.ts"

describe("extractReturnType", () => {
	function createSourceFile(code: string): typescript.SourceFile {
		return typescript.createSourceFile(
			"test.ts",
			code,
			typescript.ScriptTarget.Latest,
			true,
		)
	}

	function getFirstFunction(
		sourceFile: typescript.SourceFile,
	): typescript.FunctionDeclaration | typescript.ArrowFunction | undefined {
		let result:
			| typescript.FunctionDeclaration
			| typescript.ArrowFunction
			| undefined

		function visit(node: typescript.Node) {
			if (typescript.isFunctionDeclaration(node)) {
				result = node
				return
			}
			if (typescript.isVariableStatement(node)) {
				const declaration = node.declarationList.declarations[0]
				if (declaration && declaration.initializer) {
					if (typescript.isArrowFunction(declaration.initializer)) {
						result = declaration.initializer
						return
					}
				}
			}
			typescript.forEachChild(node, visit)
		}

		visit(sourceFile)
		return result
	}

	it("extracts explicit string return type", () => {
		const sourceFile = createSourceFile(
			`function test(): string { return "hello" }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "string")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("extracts explicit number return type", () => {
		const sourceFile = createSourceFile(`function test(): number { return 42 }`)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "number")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("extracts explicit boolean return type", () => {
		const sourceFile = createSourceFile(
			`function test(): boolean { return true }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "boolean")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("extracts void return type", () => {
		const sourceFile = createSourceFile(
			`function test(): void { console.log("test") }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "void")
		assertEquals(result.kind, TypeKind.Void)
	})

	it("extracts array return type", () => {
		const sourceFile = createSourceFile(
			`function test(): string[] { return [] }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "string[]")
		assertEquals(result.kind, TypeKind.Array)
	})

	it("extracts union return type", () => {
		const sourceFile = createSourceFile(
			`function test(): string | number { return "" }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "string | number")
		assertEquals(result.kind, TypeKind.Union)
	})

	it("extracts intersection return type", () => {
		const sourceFile = createSourceFile(
			`function test(): { a: string } & { b: number } { return { a: "", b: 0 } }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "{ a: string } & { b: number }")
		assertEquals(result.kind, TypeKind.Intersection)
	})

	it("defaults to void for functions without explicit return type", () => {
		const sourceFile = createSourceFile(`function test() { }`)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "void")
		assertEquals(result.kind, TypeKind.Void)
	})

	it("infers return type for arrow functions with expression body", () => {
		const sourceFile = createSourceFile(`const test = () => "hello"`)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "string")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("handles arrow functions with explicit return type", () => {
		const sourceFile = createSourceFile(`const test = (): number => 42`)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "number")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("handles Promise return types", () => {
		const sourceFile = createSourceFile(
			`async function test(): Promise<string> { return "" }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "Promise<string>")
		assertEquals(result.kind, TypeKind.Object)
	})

	it("handles any return type", () => {
		const sourceFile = createSourceFile(`function test(): any { return {} }`)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "any")
		assertEquals(result.kind, TypeKind.Any)
	})

	it("handles unknown return type", () => {
		const sourceFile = createSourceFile(
			`function test(): unknown { return {} }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "unknown")
		assertEquals(result.kind, TypeKind.Unknown)
	})

	it("handles never return type", () => {
		const sourceFile = createSourceFile(
			`function test(): never { throw new Error() }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "never")
		assertEquals(result.kind, TypeKind.Never)
	})

	it("handles function return type", () => {
		const sourceFile = createSourceFile(
			`function test(): () => void { return () => {} }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractReturnType(func!, sourceFile)

		assertEquals(result.raw, "() => void")
		assertEquals(result.kind, TypeKind.Function)
	})
})
