import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import * as typescript from "npm:typescript@5.7.2"

import detectGenerator from "./index.ts"

describe("detectGenerator", () => {
	function createFunction(
		code: string,
	):
		| typescript.FunctionDeclaration
		| typescript.ArrowFunction
		| typescript.MethodDeclaration
		| typescript.FunctionExpression {
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
			| typescript.FunctionExpression
			| undefined
		function visit(node: typescript.Node) {
			if (typescript.isFunctionDeclaration(node)) {
				result = node
			} else if (typescript.isFunctionExpression(node)) {
				result = node
			} else if (typescript.isVariableStatement(node)) {
				const declaration = node.declarationList.declarations[0]
				if (declaration?.initializer) {
					if (typescript.isArrowFunction(declaration.initializer)) {
						result = declaration.initializer
					} else if (typescript.isFunctionExpression(declaration.initializer)) {
						result = declaration.initializer
					}
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

	it("detects generator function declaration", () => {
		const func = createFunction(`function* test() { yield 1 }`)
		const result = detectGenerator(func!)
		assertEquals(result, true)
	})

	it("detects non-generator function declaration", () => {
		const func = createFunction(`function test() { }`)
		const result = detectGenerator(func!)
		assertEquals(result, false)
	})

	it("detects generator function expression", () => {
		const func = createFunction(`const test = function* () { yield 1 }`)
		const result = detectGenerator(func!)
		assertEquals(result, true)
	})

	it("detects non-generator function expression", () => {
		const func = createFunction(`const test = function () { }`)
		const result = detectGenerator(func!)
		assertEquals(result, false)
	})

	it("returns false for arrow functions (cannot be generators)", () => {
		const func = createFunction(`const test = () => { }`)
		const result = detectGenerator(func!)
		assertEquals(result, false)
	})

	it("detects generator method declaration", () => {
		const func = createFunction(`
			class Test {
				*method() { yield 1 }
			}
		`)
		const result = detectGenerator(func!)
		assertEquals(result, true)
	})

	it("detects non-generator method declaration", () => {
		const func = createFunction(`
			class Test {
				method() { }
			}
		`)
		const result = detectGenerator(func!)
		assertEquals(result, false)
	})

	it("detects async generator function", () => {
		const func = createFunction(`async function* test() { yield 1 }`)
		const result = detectGenerator(func!)
		assertEquals(result, true)
	})

	it("detects generator with export", () => {
		const func = createFunction(`export function* test() { yield 1 }`)
		const result = detectGenerator(func!)
		assertEquals(result, true)
	})

	it("detects generator in static method", () => {
		const func = createFunction(`
			class Test {
				static *method() { yield 1 }
			}
		`)
		const result = detectGenerator(func!)
		assertEquals(result, true)
	})

	it("arrow functions always return false", () => {
		// Even though this is invalid syntax, test the function behavior
		const func = createFunction(`const test = async () => { }`)
		const result = detectGenerator(func!)
		assertEquals(result, false)
	})

	it("handles undefined asterisk token", () => {
		const func = createFunction(`function test() { }`)
		const result = detectGenerator(func!)
		assertEquals(result, false)
	})
})
