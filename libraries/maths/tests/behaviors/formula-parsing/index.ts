import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import type { VariableMap } from "../../../src/types/index.ts"

import parseFormula from "../../../src/parseFormula/index.ts"

Deno.test("parseFormula - parses addition of two variables", () => {
	const variables: VariableMap = {
		a: { tag: "Constant", type: "injector", datatype: "Number", value: 5 },
		b: { tag: "Constant", type: "injector", datatype: "Number", value: 3 },
	}

	const result = parseFormula("a + b", variables)

	assertEquals(result.ok, true)
	if (result.ok) {
		const config = result.value
		assertEquals(config.tag, "Add")
		assertEquals(config.type, "operator")
		if (config.tag === "Add") {
			assertEquals(config.addends.length, 2)
			assertEquals(config.addends[0], variables.a)
			assertEquals(config.addends[1], variables.b)
		}
	}
})

Deno.test("parseFormula - parses subtraction of two variables", () => {
	const variables: VariableMap = {
		x: {
			tag: "Constant",
			type: "injector",
			datatype: "Integer",
			value: 10,
		},
		y: { tag: "Constant", type: "injector", datatype: "Integer", value: 4 },
	}

	const result = parseFormula("x - y", variables)

	assertEquals(result.ok, true)
	if (result.ok) {
		const config = result.value
		assertEquals(config.tag, "Subtract")
		if (config.tag === "Subtract") {
			assertEquals(config.minuend, variables.x)
			assertEquals(config.subtrahend, variables.y)
		}
	}
})

Deno.test("parseFormula - parses multiplication", () => {
	const variables: VariableMap = {
		m: { tag: "Constant", type: "injector", datatype: "Number", value: 6 },
		n: { tag: "Constant", type: "injector", datatype: "Number", value: 7 },
	}

	const result = parseFormula("m * n", variables)

	assertEquals(result.ok, true)
	if (result.ok) {
		const config = result.value
		assertEquals(config.tag, "Multiply")
		if (config.tag === "Multiply") {
			assertEquals(config.multipliers.length, 2)
			assertEquals(config.multipliers[0], variables.m)
			assertEquals(config.multipliers[1], variables.n)
		}
	}
})

Deno.test("parseFormula - parses division", () => {
	const variables: VariableMap = {
		p: {
			tag: "Constant",
			type: "injector",
			datatype: "Integer",
			value: 20,
		},
		q: { tag: "Constant", type: "injector", datatype: "Integer", value: 4 },
	}

	const result = parseFormula("p / q", variables)

	assertEquals(result.ok, true)
	if (result.ok) {
		const config = result.value
		assertEquals(config.tag, "Divide")
		if (config.tag === "Divide") {
			assertEquals(config.dividend, variables.p)
			assertEquals(config.divisor, variables.q)
		}
	}
})

Deno.test("parseFormula - respects multiplication over addition precedence", () => {
	const variables: VariableMap = {
		a: { tag: "Constant", type: "injector", datatype: "Number", value: 2 },
		b: { tag: "Constant", type: "injector", datatype: "Number", value: 3 },
		c: { tag: "Constant", type: "injector", datatype: "Number", value: 4 },
	}

	const result = parseFormula("a + b * c", variables)

	assertEquals(result.ok, true)
	if (result.ok) {
		const config = result.value
		assertEquals(config.tag, "Add")
		if (config.tag === "Add") {
			assertEquals(config.addends[0], variables.a)
			const multiply = config.addends[1]
			assertEquals(multiply.tag, "Multiply")
			if (multiply.tag === "Multiply") {
				assertEquals(multiply.multipliers[0], variables.b)
				assertEquals(multiply.multipliers[1], variables.c)
			}
		}
	}
})

Deno.test("parseFormula - respects division over subtraction precedence", () => {
	const variables: VariableMap = {
		x: { tag: "Constant", type: "injector", datatype: "Number", value: 10 },
		y: { tag: "Constant", type: "injector", datatype: "Number", value: 6 },
		z: { tag: "Constant", type: "injector", datatype: "Number", value: 2 },
	}

	const result = parseFormula("x - y / z", variables)

	assertEquals(result.ok, true)
	if (result.ok) {
		const config = result.value
		assertEquals(config.tag, "Subtract")
		if (config.tag === "Subtract") {
			assertEquals(config.minuend, variables.x)
			const divide = config.subtrahend
			assertEquals(divide.tag, "Divide")
			if (divide.tag === "Divide") {
				assertEquals(divide.dividend, variables.y)
				assertEquals(divide.divisor, variables.z)
			}
		}
	}
})

Deno.test("parseFormula - overrides precedence with parentheses", () => {
	const variables: VariableMap = {
		a: { tag: "Constant", type: "injector", datatype: "Number", value: 2 },
		b: { tag: "Constant", type: "injector", datatype: "Number", value: 3 },
		c: { tag: "Constant", type: "injector", datatype: "Number", value: 4 },
	}

	const result = parseFormula("(a + b) * c", variables)

	assertEquals(result.ok, true)
	if (result.ok) {
		const config = result.value
		assertEquals(config.tag, "Multiply")
		if (config.tag === "Multiply") {
			assertEquals(config.multipliers.length, 2)
			const add = config.multipliers[0]
			assertEquals(add.tag, "Add")
			if (add.tag === "Add") {
				assertEquals(add.addends[0], variables.a)
				assertEquals(add.addends[1], variables.b)
			}
			assertEquals(config.multipliers[1], variables.c)
		}
	}
})

Deno.test("parseFormula - parses the example formula (a / b) + (c / d)", () => {
	const variables: VariableMap = {
		a: {
			tag: "Constant",
			type: "injector",
			datatype: "Integer",
			value: 99,
		},
		b: {
			tag: "FromElement",
			type: "injector",
			datatype: "Integer",
			source: "#divisor",
		},
		c: {
			tag: "Constant",
			type: "injector",
			datatype: "Integer",
			value: 44,
		},
		d: { tag: "Constant", type: "injector", datatype: "Integer", value: 2 },
	}

	const result = parseFormula("(a / b) + (c / d)", variables)

	assertEquals(result.ok, true)
	if (result.ok) {
		const config = result.value
		assertEquals(config.tag, "Add")
		if (config.tag === "Add") {
			assertEquals(config.addends.length, 2)

			// First division (a / b)
			const leftDivide = config.addends[0]
			assertEquals(leftDivide.tag, "Divide")
			if (leftDivide.tag === "Divide") {
				assertEquals(leftDivide.dividend, variables.a)
				assertEquals(leftDivide.divisor, variables.b)
				assertEquals(leftDivide.datatype, "Integer")
			}

			// Second division (c / d)
			const rightDivide = config.addends[1]
			assertEquals(rightDivide.tag, "Divide")
			if (rightDivide.tag === "Divide") {
				assertEquals(rightDivide.dividend, variables.c)
				assertEquals(rightDivide.divisor, variables.d)
				assertEquals(rightDivide.datatype, "Integer")
			}
		}
	}
})

Deno.test("parseFormula - infers Integer type when all variables are Integer", () => {
	const variables: VariableMap = {
		x: {
			tag: "Constant",
			type: "injector",
			datatype: "Integer",
			value: 5,
		},
		y: {
			tag: "Constant",
			type: "injector",
			datatype: "Integer",
			value: 3,
		},
	}

	const result = parseFormula("x + y", variables)

	assertEquals(result.ok, true)
	if (result.ok && result.value.tag === "Add") {
		assertEquals(result.value.datatype, "Integer")
	}
})

Deno.test("parseFormula - defaults to Number when types are mixed", () => {
	const variables: VariableMap = {
		x: {
			tag: "Constant",
			type: "injector",
			datatype: "Integer",
			value: 5,
		},
		y: {
			tag: "Constant",
			type: "injector",
			datatype: "Float",
			value: 3.14,
		},
	}

	const result = parseFormula("x + y", variables)

	assertEquals(result.ok, true)
	if (result.ok && result.value.tag === "Add") {
		assertEquals(result.value.datatype, "Number")
	}
})

Deno.test("parseFormula - reports undefined variables", () => {
	const variables: VariableMap = {
		a: { tag: "Constant", type: "injector", datatype: "Number", value: 5 },
	}

	const result = parseFormula("a + b", variables)

	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message.includes("Undefined variable: b"), true)
	}
})

Deno.test("parseFormula - reports syntax errors", () => {
	const variables: VariableMap = {}

	const result = parseFormula("+ +", variables)

	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message.includes("Unexpected"), true)
	}
})

Deno.test("parseFormula - reports mismatched parentheses", () => {
	const variables: VariableMap = {
		a: { tag: "Constant", type: "injector", datatype: "Number", value: 5 },
	}

	const result = parseFormula("(a + a", variables)

	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(
			result.error.message.includes("parenthes") ||
				result.error.message.includes(")"),
			true,
		)
	}
})