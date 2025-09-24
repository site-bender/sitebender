import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import * as typescript from "npm:typescript@5.7.2"

import detectPure from "./index.ts"

describe("detectPure", () => {
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

	it("detects pure function with only computations", () => {
		const sourceFile = createSourceFile(
			`function add(a: number, b: number): number { return a + b }`,
		)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, true)
	})

	it("detects impure async function", () => {
		const sourceFile = createSourceFile(`async function test() { return 42 }`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects impure generator function", () => {
		const sourceFile = createSourceFile(`function* test() { yield 42 }`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects impure function with throw statement", () => {
		const sourceFile = createSourceFile(`
			function test(x: number) {
				if (x < 0) throw new Error("negative")
				return x
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects impure function with await expression", () => {
		const sourceFile = createSourceFile(`
			async function test() {
				const result = await fetch("/api")
				return result
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects impure function with console access", () => {
		const sourceFile = createSourceFile(`
			function test() {
				console.log("test")
				return 42
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects impure function with window access", () => {
		const sourceFile = createSourceFile(`
			function test() {
				return window.location.href
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects impure function with document access", () => {
		const sourceFile = createSourceFile(`
			function test() {
				return document.title
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects impure function with mutations", () => {
		const sourceFile = createSourceFile(`
			function test(obj: any) {
				obj.value = 42
				return obj
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects impure function with array mutations", () => {
		const sourceFile = createSourceFile(`
			function test(arr: number[]) {
				arr[0] = 42
				return arr
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects pure function with local variables", () => {
		const sourceFile = createSourceFile(`
			function test(x: number) {
				const doubled = x * 2
				const tripled = x * 3
				return doubled + tripled
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, true)
	})

	it("detects pure arrow function", () => {
		const sourceFile = createSourceFile(
			`const test = (a: number, b: number) => a + b`,
		)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, true)
	})

	it("detects impure function with setTimeout", () => {
		const sourceFile = createSourceFile(`
			function test() {
				setTimeout(() => {}, 1000)
				return 42
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects impure function with fetch", () => {
		const sourceFile = createSourceFile(`
			function test() {
				fetch("/api")
				return 42
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects impure function with localStorage", () => {
		const sourceFile = createSourceFile(`
			function test() {
				localStorage.setItem("key", "value")
				return 42
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("returns false for function without body", () => {
		const sourceFile = createSourceFile(`declare function test(): number`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, false)
	})

	it("detects pure method", () => {
		const sourceFile = createSourceFile(`
			class Test {
				method(x: number): number {
					return x * 2
				}
			}
		`)
		const func = getFunction(sourceFile)
		const result = detectPure(func!, sourceFile)
		assertEquals(result, true)
	})
})
