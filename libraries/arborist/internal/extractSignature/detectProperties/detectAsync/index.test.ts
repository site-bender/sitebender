import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import * as typescript from "npm:typescript@5.7.2"

import detectAsync from "./index.ts"

describe("detectAsync", () => {
	function createFunction(
		code: string,
	):
		| typescript.FunctionDeclaration
		| typescript.ArrowFunction
		| typescript.MethodDeclaration {
		const sourceFile = typescript.createSourceFile(
			"test.ts",
			code,
			typescript.ScriptTarget.Latest,
			true,
		)

		let result:
			| typescript.FunctionDeclaration
			| typescript.ArrowFunction
			| typescript.MethodDeclaration
			| undefined
		function visit(node: typescript.Node) {
			if (typescript.isFunctionDeclaration(node)) {
				result = node
			} else if (typescript.isVariableStatement(node)) {
				const declaration = node.declarationList.declarations[0]
				if (
					declaration?.initializer &&
					typescript.isArrowFunction(declaration.initializer)
				) {
					result = declaration.initializer
				}
			} else if (typescript.isMethodDeclaration(node)) {
				result = node
			}
			if (!result) {
				typescript.forEachChild(node, visit)
			}
		}
		visit(sourceFile)
		return result!
	}

	it("detects async function declaration", () => {
		const func = createFunction(`async function test() { }`)
		const result = detectAsync(func!)
		assertEquals(result, true)
	})

	it("detects non-async function declaration", () => {
		const func = createFunction(`function test() { }`)
		const result = detectAsync(func!)
		assertEquals(result, false)
	})

	it("detects async arrow function", () => {
		const func = createFunction(`const test = async () => { }`)
		const result = detectAsync(func!)
		assertEquals(result, true)
	})

	it("detects non-async arrow function", () => {
		const func = createFunction(`const test = () => { }`)
		const result = detectAsync(func!)
		assertEquals(result, false)
	})

	it("detects async method declaration", () => {
		const func = createFunction(`
			class Test {
				async method() { }
			}
		`)
		const result = detectAsync(func!)
		assertEquals(result, true)
	})

	it("detects non-async method declaration", () => {
		const func = createFunction(`
			class Test {
				method() { }
			}
		`)
		const result = detectAsync(func!)
		assertEquals(result, false)
	})

	it("handles function with no modifiers", () => {
		const func = createFunction(`function test() { }`)
		const result = detectAsync(func!)
		assertEquals(result, false)
	})

	it("detects async with other modifiers", () => {
		const func = createFunction(`export async function test() { }`)
		const result = detectAsync(func!)
		assertEquals(result, true)
	})

	it("detects async in private method", () => {
		const func = createFunction(`
			class Test {
				private async method() { }
			}
		`)
		const result = detectAsync(func!)
		assertEquals(result, true)
	})

	it("detects async in static method", () => {
		const func = createFunction(`
			class Test {
				static async method() { }
			}
		`)
		const result = detectAsync(func!)
		assertEquals(result, true)
	})
})
