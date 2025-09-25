import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import * as typescript from "npm:typescript@5.7.2"

import { TypeKind } from "../../../types/index.ts"
import inferReturnType from "./index.ts"

describe("inferReturnType", () => {
	function createExpression(code: string): typescript.Expression {
		const sourceFile = typescript.createSourceFile(
			"test.ts",
			`const x = ${code}`,
			typescript.ScriptTarget.Latest,
			true,
		)

		const statement = sourceFile.statements[0] as typescript.VariableStatement
		const declaration = statement.declarationList.declarations[0]
		return declaration.initializer!
	}

	it("infers string literal type", () => {
		const expr = createExpression(`"hello"`)
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "string")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("infers template literal type", () => {
		const expr = createExpression("`hello`")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "string")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("infers template expression type", () => {
		const expr = createExpression("`hello \${name}`")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "string")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("infers numeric literal type", () => {
		const expr = createExpression("42")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "number")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("infers true keyword type", () => {
		const expr = createExpression("true")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "boolean")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("infers false keyword type", () => {
		const expr = createExpression("false")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "boolean")
		assertEquals(result.kind, TypeKind.Primitive)
	})

	it("infers null keyword type", () => {
		const expr = createExpression("null")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "null")
		assertEquals(result.kind, TypeKind.Null)
	})

	it("infers undefined keyword type", () => {
		const expr = createExpression("undefined")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "undefined")
		assertEquals(result.kind, TypeKind.Undefined)
	})

	it("infers array literal type", () => {
		const expr = createExpression("[1, 2, 3]")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "Array<unknown>")
		assertEquals(result.kind, TypeKind.Array)
	})

	it("infers object literal type", () => {
		const expr = createExpression("{ a: 1, b: 2 }")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "object")
		assertEquals(result.kind, TypeKind.Object)
	})

	it("infers arrow function type", () => {
		const expr = createExpression("() => 42")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "Function")
		assertEquals(result.kind, TypeKind.Function)
	})

	it("infers function expression type", () => {
		const expr = createExpression("function() { return 42 }")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "Function")
		assertEquals(result.kind, TypeKind.Function)
	})

	it("infers await expression type", () => {
		const sourceFile = typescript.createSourceFile(
			"test.ts",
			`async function test() { const x = await Promise.resolve(42) }`,
			typescript.ScriptTarget.Latest,
			true,
		)

		let awaitExpr: typescript.Expression | undefined
		function visit(node: typescript.Node) {
			if (typescript.isAwaitExpression(node)) {
				awaitExpr = node
				return
			}
			typescript.forEachChild(node, visit)
		}
		visit(sourceFile)

		const result = inferReturnType(awaitExpr!, sourceFile)

		assertEquals(result.raw, "Promise<unknown>")
		assertEquals(result.kind, TypeKind.Object)
	})

	it("returns unknown for complex expressions", () => {
		const expr = createExpression("someVariable")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "unknown")
		assertEquals(result.kind, TypeKind.Unknown)
	})

	it("returns unknown for binary expressions", () => {
		const expr = createExpression("1 + 2")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "unknown")
		assertEquals(result.kind, TypeKind.Unknown)
	})

	it("returns unknown for conditional expressions", () => {
		const expr = createExpression("true ? 1 : 2")
		const result = inferReturnType(expr, {} as typescript.SourceFile)

		assertEquals(result.raw, "unknown")
		assertEquals(result.kind, TypeKind.Unknown)
	})
})
