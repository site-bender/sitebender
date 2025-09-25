import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import * as typescript from "npm:typescript@5.7.2"

import detectCurried from "./index.ts"

describe("detectCurried", () => {
	function createSourceFile(code: string): typescript.SourceFile {
		return typescript.createSourceFile(
			"test.ts",
			code,
			typescript.ScriptTarget.Latest,
			true,
		)
	}

	function getFunction(
		sourceFile: typescript.SourceFile,
	):
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration
		| undefined {
		let result:
			| typescript.FunctionDeclaration
			| typescript.FunctionExpression
			| typescript.ArrowFunction
			| typescript.MethodDeclaration
			| undefined
		function visit(node: typescript.Node) {
			if (typescript.isFunctionDeclaration(node)) {
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
		return result
	}

	it("detects curried function with explicit return type", () => {
		const sourceFile = createSourceFile(
			`function add(a: number): (b: number) => number { return (b) => a + b }`,
		)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, true)
	})

	it("detects non-curried function", () => {
		const sourceFile = createSourceFile(
			`function add(a: number, b: number): number { return a + b }`,
		)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects arrow function returning arrow function", () => {
		const sourceFile = createSourceFile(
			`const add = (a: number) => (b: number) => a + b`,
		)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, true)
	})

	it("detects non-curried arrow function", () => {
		const sourceFile = createSourceFile(
			`const add = (a: number, b: number) => a + b`,
		)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects function type in return annotation", () => {
		const sourceFile = createSourceFile(
			`function test(): Function { return () => {} }`,
		)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, true)
	})

	it("detects function signature in return type", () => {
		const sourceFile = createSourceFile(
			`function test(): () => void { return () => {} }`,
		)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, true)
	})

	it("detects curried function with block body", () => {
		const sourceFile = createSourceFile(`
			function curry(a: number) {
				return function(b: number) {
					return a + b
				}
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, true)
	})

	it("detects curried arrow function with block body", () => {
		const sourceFile = createSourceFile(`
			function curry(a: number) {
				return (b: number) => a + b
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, true)
	})

	it("returns false for void return type", () => {
		const sourceFile = createSourceFile(`function test(): void { }`)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, false)
	})

	it("returns false for primitive return type", () => {
		const sourceFile = createSourceFile(
			`function test(): string { return "hello" }`,
		)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, false)
	})

	it("returns false for function without return statements", () => {
		const sourceFile = createSourceFile(
			`function test() { console.log("test") }`,
		)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, false)
	})

	it("returns false for function returning non-function value", () => {
		const sourceFile = createSourceFile(`
			function test() {
				return 42
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects method returning function", () => {
		const sourceFile = createSourceFile(`
			class Test {
				method(): () => void {
					return () => {}
				}
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectCurried(func!, sourceFile)
		assertEquals(result, true)
	})
})
