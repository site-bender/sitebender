import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { parseFormula } from "../../../src/index.ts"
import tokenize from "../../../src/tokenizer/index.ts"

Deno.test("tokenize - tokenizes comparison operators", () => {
	// Test single character comparisons
	const ltResult = tokenize("a < b")
	assertEquals(ltResult.ok, true)
	if (ltResult.ok) {
		assertEquals(ltResult.value[1].type, "LESS_THAN")
		assertEquals(ltResult.value[1].value, "<")
	}
	const gtResult = tokenize("a > b")
	assertEquals(gtResult.ok, true)
	if (gtResult.ok) {
		assertEquals(gtResult.value[1].type, "GREATER_THAN")
		assertEquals(gtResult.value[1].value, ">")
	}
	
	// Test two-character comparisons
	const eqResult = tokenize("a == b")
	assertEquals(eqResult.ok, true)
	if (eqResult.ok) {
		assertEquals(eqResult.value[1].type, "EQUAL")
		assertEquals(eqResult.value[1].value, "==")
	}
	
	const neqResult = tokenize("a != b")
	assertEquals(neqResult.ok, true)
	if (neqResult.ok) {
		assertEquals(neqResult.value[1].type, "NOT_EQUAL")
		assertEquals(neqResult.value[1].value, "!=")
	}
	
	const leResult = tokenize("a <= b")
	assertEquals(leResult.ok, true)
	if (leResult.ok) {
		assertEquals(leResult.value[1].type, "LESS_EQUAL")
		assertEquals(leResult.value[1].value, "<=")
	}
	
	const geResult = tokenize("a >= b")
	assertEquals(geResult.ok, true)
	if (geResult.ok) {
		assertEquals(geResult.value[1].type, "GREATER_EQUAL")
		assertEquals(geResult.value[1].value, ">=")
	}
})

Deno.test("tokenize - tokenizes question and colon for ternary", () => {
	const result = tokenize("a > 5 ? x : y")
	assertEquals(result.ok, true)
	if (result.ok) {
		// Find ? token
		const questionToken = result.value.find(t => t.type === "QUESTION")
		assertEquals(questionToken?.type, "QUESTION")
		assertEquals(questionToken?.value, "?")
		
		// Find : token
		const colonToken = result.value.find(t => t.type === "COLON")
		assertEquals(colonToken?.type, "COLON")
		assertEquals(colonToken?.value, ":")
	}
})

Deno.test("parseFormula - parses less than comparison", () => {
	const variables = {
		a: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 5 },
		b: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 10 },
	}
	const result = parseFormula("a < b", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "IsLessThan")
		assertEquals(result.value.type, "comparator")
	}
})

Deno.test("parseFormula - parses greater than comparison", () => {
	const variables = {
		a: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 10 },
		b: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 5 },
	}
	const result = parseFormula("a > b", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "IsMoreThan")
		assertEquals(result.value.type, "comparator")
	}
})

Deno.test("parseFormula - parses equality comparison", () => {
	const variables = {
		a: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 5 },
		b: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 5 },
	}
	const result = parseFormula("a == b", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "IsEqualTo")
		assertEquals(result.value.type, "comparator")
	}
})

Deno.test("parseFormula - parses inequality comparison", () => {
	const variables = {
		a: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 5 },
		b: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 10 },
	}
	const result = parseFormula("a != b", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "IsUnequalTo")
		assertEquals(result.value.type, "comparator")
	}
})

Deno.test("parseFormula - parses less than or equal comparison", () => {
	const variables = {
		a: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 5 },
		b: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 5 },
	}
	const result = parseFormula("a <= b", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "IsNoMoreThan")
		assertEquals(result.value.type, "comparator")
	}
})

Deno.test("parseFormula - parses greater than or equal comparison", () => {
	const variables = {
		a: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 10 },
		b: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 10 },
	}
	const result = parseFormula("a >= b", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "IsNoLessThan")
		assertEquals(result.value.type, "comparator")
	}
})

Deno.test("parseFormula - comparisons work with complex expressions", () => {
	const variables = {
		a: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 5 },
		b: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 3 },
		c: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 10 },
	}
	const result = parseFormula("(a + b) < c", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "IsLessThan")
		// The operand should be an Add operation
		if ("operand" in result.value) {
			assertEquals(result.value.operand.tag, "Add")
		}
	}
})

Deno.test("parseFormula - comparison precedence is lower than arithmetic", () => {
	const variables = {
		a: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 2 },
		b: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 3 },
		c: { tag: "Constant" as const, type: "injector" as const, datatype: "Number" as const, value: 10 },
	}
	// Should parse as (a + b) < c, not a + (b < c)
	const result = parseFormula("a + b < c", variables)
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "IsLessThan")
		if ("operand" in result.value) {
			assertEquals(result.value.operand.tag, "Add")
		}
	}
})