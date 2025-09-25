import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import * as typescript from "npm:typescript@5.7.2"

import extractGenerics from "./index.ts"

describe("extractGenerics", () => {
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
	): typescript.FunctionDeclaration | undefined {
		let result: typescript.FunctionDeclaration | undefined

		function visit(node: typescript.Node) {
			if (typescript.isFunctionDeclaration(node)) {
				result = node
				return
			}
			typescript.forEachChild(node, visit)
		}

		visit(sourceFile)
		return result
	}

	it("returns empty array for functions without generics", () => {
		const sourceFile = createSourceFile(`function test() { }`)
		const func = getFirstFunction(sourceFile)
		const result = extractGenerics(func!, sourceFile)

		assertEquals(result, [])
	})

	it("extracts single generic parameter", () => {
		const sourceFile = createSourceFile(`function test<T>() { }`)
		const func = getFirstFunction(sourceFile)
		const result = extractGenerics(func!, sourceFile)

		assertEquals(result.length, 1)
		assertEquals(result[0].name, "T")
		assertEquals(result[0].constraint, undefined)
		assertEquals(result[0].default, undefined)
	})

	it("extracts multiple generic parameters", () => {
		const sourceFile = createSourceFile(`function test<T, U, V>() { }`)
		const func = getFirstFunction(sourceFile)
		const result = extractGenerics(func!, sourceFile)

		assertEquals(result.length, 3)
		assertEquals(result[0].name, "T")
		assertEquals(result[1].name, "U")
		assertEquals(result[2].name, "V")
	})

	it("extracts generic with constraint", () => {
		const sourceFile = createSourceFile(`function test<T extends string>() { }`)
		const func = getFirstFunction(sourceFile)
		const result = extractGenerics(func!, sourceFile)

		assertEquals(result.length, 1)
		assertEquals(result[0].name, "T")
		assertEquals(result[0].constraint, "string")
		assertEquals(result[0].default, undefined)
	})

	it("extracts generic with complex constraint", () => {
		const sourceFile = createSourceFile(
			`function test<K extends keyof T>() { }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractGenerics(func!, sourceFile)

		assertEquals(result.length, 1)
		assertEquals(result[0].name, "K")
		assertEquals(result[0].constraint, "keyof T")
		assertEquals(result[0].default, undefined)
	})

	it("extracts generic with default type", () => {
		const sourceFile = createSourceFile(`function test<T = string>() { }`)
		const func = getFirstFunction(sourceFile)
		const result = extractGenerics(func!, sourceFile)

		assertEquals(result.length, 1)
		assertEquals(result[0].name, "T")
		assertEquals(result[0].constraint, undefined)
		assertEquals(result[0].default, "string")
	})

	it("extracts generic with both constraint and default", () => {
		const sourceFile = createSourceFile(
			`function test<T extends object = {}>() { }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractGenerics(func!, sourceFile)

		assertEquals(result.length, 1)
		assertEquals(result[0].name, "T")
		assertEquals(result[0].constraint, "object")
		assertEquals(result[0].default, "{}")
	})

	it("extracts complex generic signature", () => {
		const sourceFile = createSourceFile(
			`function test<T extends string, U = number, V extends T = T>() { }`,
		)
		const func = getFirstFunction(sourceFile)
		const result = extractGenerics(func!, sourceFile)

		assertEquals(result.length, 3)

		assertEquals(result[0].name, "T")
		assertEquals(result[0].constraint, "string")
		assertEquals(result[0].default, undefined)

		assertEquals(result[1].name, "U")
		assertEquals(result[1].constraint, undefined)
		assertEquals(result[1].default, "number")

		assertEquals(result[2].name, "V")
		assertEquals(result[2].constraint, "T")
		assertEquals(result[2].default, "T")
	})

	it("works with arrow functions", () => {
		const sourceFile = createSourceFile(`const test = <T>() => {}`)
		let arrowFunc: typescript.ArrowFunction | undefined

		function visit(node: typescript.Node) {
			if (typescript.isVariableStatement(node)) {
				const declaration = node.declarationList.declarations[0]
				if (
					declaration && typescript.isArrowFunction(declaration.initializer!)
				) {
					arrowFunc = declaration.initializer
				}
			}
			typescript.forEachChild(node, visit)
		}
		visit(sourceFile)

		const result = extractGenerics(arrowFunc!, sourceFile)
		assertEquals(result.length, 1)
		assertEquals(result[0].name, "T")
	})

	it("works with method declarations", () => {
		const sourceFile = createSourceFile(`
			class Test {
				method<T, U>() { }
			}
		`)

		let methodDecl: typescript.MethodDeclaration | undefined
		function visit(node: typescript.Node) {
			if (typescript.isMethodDeclaration(node)) {
				methodDecl = node
			}
			typescript.forEachChild(node, visit)
		}
		visit(sourceFile)

		const result = extractGenerics(methodDecl!, sourceFile)
		assertEquals(result.length, 2)
		assertEquals(result[0].name, "T")
		assertEquals(result[1].name, "U")
	})
})
