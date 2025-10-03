import { assertEquals } from "@std/assert"

import compiler from "./index.ts"

Deno.test("compiler - compiles simple addition", () => {
	const formula = "2 + 3"
	const compiled = compiler(formula)

	assertEquals(compiled._tag, "compiledFormula")
	assertEquals(compiled.sourceFormula, "2 + 3")
	assertEquals(compiled.ast._tag, "binaryOperator")

	if (compiled.ast._tag === "binaryOperator") {
		assertEquals(compiled.ast.operator, "add")
		assertEquals(compiled.ast.datatype, "Number")
	}

	assertEquals(compiled.metadata.variables.size, 0)
	assertEquals(compiled.metadata.constants.size, 0)
	assertEquals(compiled.metadata.outputDatatype, "Number")
})

Deno.test("compiler - collects variable metadata", () => {
	const formula = "(a - b) / c"
	const compiled = compiler(formula)

	assertEquals(compiled.metadata.variables.size, 3)
	assertEquals(compiled.metadata.variables.has("a"), true)
	assertEquals(compiled.metadata.variables.has("b"), true)
	assertEquals(compiled.metadata.variables.has("c"), true)

	const varA = compiled.metadata.variables.get("a")!
	assertEquals(varA.name, "a")
	assertEquals(varA.datatype, "Number")
	assertEquals(varA.positions.length, 1)
})

Deno.test("compiler - recognizes constants", () => {
	const formula = "sin(π / 2)"
	const compiled = compiler(formula)

	assertEquals(compiled.metadata.constants.size, 1)
	assertEquals(compiled.metadata.constants.has("π"), true)

	const piConstant = compiled.metadata.constants.get("π")!
	assertEquals(piConstant.name, "π")
	assertEquals(piConstant.value, Math.PI)
	assertEquals(piConstant.datatype, "Number")

	assertEquals(compiled.metadata.variables.size, 0)
})

Deno.test("compiler - collects function metadata", () => {
	const formula = "sin(x) + cos(y)"
	const compiled = compiler(formula)

	assertEquals(compiled.metadata.functions.size, 2)
	assertEquals(compiled.metadata.functions.has("sin"), true)
	assertEquals(compiled.metadata.functions.has("cos"), true)

	const sinFunc = compiled.metadata.functions.get("sin")!
	assertEquals(sinFunc.name, "sin")
	assertEquals(sinFunc.arity, 1)
	assertEquals(sinFunc.returnDatatype, "Number")
})

Deno.test("compiler - maps operator names to semantic operations", () => {
	const formula = "a * b + c / d - e ^ f"
	const compiled = compiler(formula)

	const ast = compiled.ast

	if (ast._tag === "binaryOperator") {
		assertEquals(ast.operator, "subtract")

		if (ast.left._tag === "binaryOperator") {
			assertEquals(ast.left.operator, "add")

			if (ast.left.left._tag === "binaryOperator") {
				assertEquals(ast.left.left.operator, "multiply")
			}

			if (ast.left.right._tag === "binaryOperator") {
				assertEquals(ast.left.right.operator, "divide")
			}
		}

		if (ast.right._tag === "binaryOperator") {
			assertEquals(ast.right.operator, "power")
		}
	}
})

Deno.test("compiler - preserves tree structure (no flattening)", () => {
	const formula = "2 + 3 + 4"
	const compiled = compiler(formula)

	const ast = compiled.ast

	assertEquals(ast._tag, "binaryOperator")

	if (ast._tag === "binaryOperator") {
		assertEquals(ast.operator, "add")
		assertEquals(ast.left._tag, "binaryOperator")
		assertEquals(ast.right._tag, "numberLiteral")
	}
})
