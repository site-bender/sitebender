import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { parseFormula } from "../../../src/index.ts"

Deno.test("parseFormula - parses simple conditional expression 'a > 5 ? x : y'", () => {
	const variables = {
		a: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 10,
		},
		x: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 100,
		},
		y: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 200,
		},
	}
	const result = parseFormula("a > 5 ? x : y", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Ternary")
		assertEquals(result.value.type, "operator")
	}
})

Deno.test("parseFormula - parses conditional with complex condition '(a + b) > 10 ? x : y'", () => {
	const variables = {
		a: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 5,
		},
		b: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 8,
		},
		x: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 100,
		},
		y: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 200,
		},
	}
	const result = parseFormula("(a + b) > 10 ? x : y", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Ternary")
	}
})

Deno.test("parseFormula - parses nested conditional expressions 'a > 0 ? x : b > 0 ? y : z'", () => {
	const variables = {
		a: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 1,
		},
		b: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: -1,
		},
		x: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 100,
		},
		y: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 200,
		},
		z: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 300,
		},
	}
	const result = parseFormula("a > 0 ? x : b > 0 ? y : z", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Ternary")
		assertEquals(result.value.type, "operator")
		// The ifFalse branch should also be a Ternary
		if ("ifFalse" in result.value) {
			assertEquals(result.value.ifFalse.tag, "Ternary")
		}
	}
})

Deno.test("parseFormula - parses conditional with expressions in branches 'a > 5 ? x * 2 : y / 2'", () => {
	const variables = {
		a: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 10,
		},
		x: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 100,
		},
		y: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 200,
		},
	}
	const result = parseFormula("a > 5 ? x * 2 : y / 2", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Ternary")
		// Check that branches are operators
		if ("ifTrue" in result.value && "ifFalse" in result.value) {
			assertEquals(result.value.ifTrue.tag, "Multiply")
			assertEquals(result.value.ifFalse.tag, "Divide")
		}
	}
})

Deno.test("parseFormula - handles all comparison operators in conditions", () => {
	const variables = {
		a: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 5,
		},
		b: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 5,
		},
		x: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 1,
		},
		y: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 0,
		},
	}

	// Test ==
	const eqResult = parseFormula("a == b ? x : y", variables)
	assertEquals(eqResult.ok, true)
	if (eqResult.ok) {
		assertEquals(eqResult.value.tag, "Ternary")
		if ("condition" in eqResult.value) {
			assertEquals(eqResult.value.condition.tag, "IsEqualTo")
		}
	}

	// Test !=
	const neqResult = parseFormula("a != b ? x : y", variables)
	assertEquals(neqResult.ok, true)
	if (neqResult.ok) {
		assertEquals(neqResult.value.tag, "Ternary")
		if ("condition" in neqResult.value) {
			assertEquals(neqResult.value.condition.tag, "IsUnequalTo")
		}
	}

	// Test <
	const ltResult = parseFormula("a < b ? x : y", variables)
	assertEquals(ltResult.ok, true)
	if (ltResult.ok && "condition" in ltResult.value) {
		assertEquals(ltResult.value.condition.tag, "IsLessThan")
	}

	// Test <=
	const leResult = parseFormula("a <= b ? x : y", variables)
	assertEquals(leResult.ok, true)
	if (leResult.ok && "condition" in leResult.value) {
		assertEquals(leResult.value.condition.tag, "IsNoMoreThan")
	}

	// Test >
	const gtResult = parseFormula("a > b ? x : y", variables)
	assertEquals(gtResult.ok, true)
	if (gtResult.ok && "condition" in gtResult.value) {
		assertEquals(gtResult.value.condition.tag, "IsMoreThan")
	}

	// Test >=
	const geResult = parseFormula("a >= b ? x : y", variables)
	assertEquals(geResult.ok, true)
	if (geResult.ok && "condition" in geResult.value) {
		assertEquals(geResult.value.condition.tag, "IsNoLessThan")
	}
})

Deno.test("parseFormula - error when missing colon in conditional", () => {
	const variables = {
		a: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 10,
		},
		x: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 100,
		},
	}
	const result = parseFormula("a > 5 ? x", variables)
	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message.includes("Expected ':'"), true)
	}
})

Deno.test("parseFormula - error when missing expression after question mark", () => {
	const variables = {
		a: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 10,
		},
	}
	const result = parseFormula("a > 5 ?", variables)
	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message.includes("Unexpected token"), true)
	}
})

Deno.test("parseFormula - parses conditional with parentheses in condition", () => {
	const variables = {
		a: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 5,
		},
		b: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 10,
		},
		c: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 3,
		},
		x: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 100,
		},
		y: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 200,
		},
	}
	const result = parseFormula("(a + c) > b ? x : y", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Ternary")
	}
})

Deno.test("parseFormula - complex nested expression with arithmetic", () => {
	const variables = {
		a: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 5,
		},
		b: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 10,
		},
		c: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 15,
		},
		x: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 100,
		},
		y: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 200,
		},
	}
	// This should exercise the minPrecedence > 0 path
	const result = parseFormula("a + b > c ? x + 1 : y - 1", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Ternary")
	}
})

Deno.test("parseFormula - conditional with different datatypes uses appropriate type", () => {
	const variables = {
		a: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Number" as const,
			value: 10,
		},
		x: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Integer" as const,
			value: 100,
		},
		y: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Float" as const,
			value: 200.5,
		},
	}
	const result = parseFormula("a > 5 ? x : y", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Ternary")
		// When mixing Integer and Float, should default to Number
		assertEquals(result.value.datatype, "Number")
	}
})
