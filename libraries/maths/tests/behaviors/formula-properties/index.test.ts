import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.218.0/testing/bdd.ts"
import * as fc from "npm:fast-check@3.17.1"

import type { VariableMap } from "../../../src/types/index.ts"

import parseFormula from "../../../src/parseFormula/index.ts"

describe("Formula parsing properties", () => {
	describe("Associativity properties", () => {
		it("addition is left-associative", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: -100, max: 100 }),
					(val1, val2, val3) => {
						const variables: VariableMap = {
							a: {
								tag: "Constant",
								type: "injector",
								datatype: "Number",
								value: val1,
							},
							b: {
								tag: "Constant",
								type: "injector",
								datatype: "Number",
								value: val2,
							},
							c: {
								tag: "Constant",
								type: "injector",
								datatype: "Number",
								value: val3,
							},
						}

						const result1 = parseFormula("a + b + c", variables)
						const result2 = parseFormula("(a + b) + c", variables)

						// Both should parse successfully
						assertEquals(result1.ok, true)
						assertEquals(result2.ok, true)

						// And produce equivalent structures (left-associative)
						if (result1.ok && result2.ok) {
							// Both should be Add at the root
							assertEquals(result1.value.tag, "Add")
							assertEquals(result2.value.tag, "Add")

							// Structure should be ((a + b) + c) for both
							if (
								result1.value.tag === "Add" &&
								result2.value.tag === "Add"
							) {
								// First addend should be (a + b)
								const firstAddend1 = result1.value.addends[0]
								const firstAddend2 = result2.value.addends[0]
								assertEquals(firstAddend1.tag, "Add")
								assertEquals(firstAddend2.tag, "Add")

								// Second addend should be c
								assertEquals(result1.value.addends[1], variables.c)
								assertEquals(result2.value.addends[1], variables.c)
							}
						}
					},
				),
			)
		})

		it("multiplication is left-associative", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 1, max: 10 }),
					(val1, val2, val3) => {
						const variables: VariableMap = {
							x: {
								tag: "Constant",
								type: "injector",
								datatype: "Number",
								value: val1,
							},
							y: {
								tag: "Constant",
								type: "injector",
								datatype: "Number",
								value: val2,
							},
							z: {
								tag: "Constant",
								type: "injector",
								datatype: "Number",
								value: val3,
							},
						}

						const result1 = parseFormula("x * y * z", variables)
						const result2 = parseFormula("(x * y) * z", variables)

						assertEquals(result1.ok, true)
						assertEquals(result2.ok, true)

						if (result1.ok && result2.ok) {
							assertEquals(result1.value.tag, "Multiply")
							assertEquals(result2.value.tag, "Multiply")

							if (
								result1.value.tag === "Multiply" &&
								result2.value.tag === "Multiply"
							) {
								// First multiplier should be (x * y)
								const firstMultiplier1 = result1.value.multipliers[0]
								const firstMultiplier2 = result2.value.multipliers[0]
								assertEquals(firstMultiplier1.tag, "Multiply")
								assertEquals(firstMultiplier2.tag, "Multiply")

								// Second multiplier should be z
								assertEquals(result1.value.multipliers[1], variables.z)
								assertEquals(result2.value.multipliers[1], variables.z)
							}
						}
					},
				),
			)
		})
	})

	describe("Identity properties", () => {
		it("adding zero preserves value structure", () => {
			fc.assert(
				fc.property(fc.integer({ min: -100, max: 100 }), (value) => {
					const variables: VariableMap = {
						a: {
							tag: "Constant",
							type: "injector",
							datatype: "Number",
							value,
						},
						zero: {
							tag: "Constant",
							type: "injector",
							datatype: "Number",
							value: 0,
						},
					}

					const result = parseFormula("a + zero", variables)

					assertEquals(result.ok, true)
					if (result.ok) {
						assertEquals(result.value.tag, "Add")
						if (result.value.tag === "Add") {
							assertEquals(result.value.addends[0], variables.a)
							assertEquals(result.value.addends[1], variables.zero)
						}
					}
				}),
			)
		})

		it("multiplying by one preserves value structure", () => {
			fc.assert(
				fc.property(fc.integer({ min: -100, max: 100 }), (value) => {
					const variables: VariableMap = {
						a: {
							tag: "Constant",
							type: "injector",
							datatype: "Number",
							value,
						},
						one: {
							tag: "Constant",
							type: "injector",
							datatype: "Number",
							value: 1,
						},
					}

					const result = parseFormula("a * one", variables)

					assertEquals(result.ok, true)
					if (result.ok) {
						assertEquals(result.value.tag, "Multiply")
						if (result.value.tag === "Multiply") {
							assertEquals(result.value.multipliers[0], variables.a)
							assertEquals(result.value.multipliers[1], variables.one)
						}
					}
				}),
			)
		})
	})

	describe("Parentheses properties", () => {
		it("redundant parentheses don't change structure for single operations", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: -100, max: 100 }),
					fc.integer({ min: -100, max: 100 }),
					(val1, val2) => {
						const variables: VariableMap = {
							x: {
								tag: "Constant",
								type: "injector",
								datatype: "Number",
								value: val1,
							},
							y: {
								tag: "Constant",
								type: "injector",
								datatype: "Number",
								value: val2,
							},
						}

						const result1 = parseFormula("x + y", variables)
						const result2 = parseFormula("(x + y)", variables)
						const result3 = parseFormula("((x + y))", variables)

						assertEquals(result1.ok, true)
						assertEquals(result2.ok, true)
						assertEquals(result3.ok, true)

						if (result1.ok && result2.ok && result3.ok) {
							// All should produce the same structure
							assertEquals(result1.value, result2.value)
							assertEquals(result2.value, result3.value)
						}
					},
				),
			)
		})
	})

	describe("Variable substitution properties", () => {
		it("supports different injector types", () => {
			fc.assert(
				fc.property(fc.integer({ min: 1, max: 100 }), (value) => {
					// Test with different injector types
					const constantVar: VariableMap = {
						a: {
							tag: "Constant",
							type: "injector",
							datatype: "Number",
							value,
						},
						b: {
							tag: "Constant",
							type: "injector",
							datatype: "Number",
							value: 2,
						},
					}

					const elementVar: VariableMap = {
						a: {
							tag: "FromElement",
							type: "injector",
							datatype: "Number",
							source: "#input",
						},
						b: {
							tag: "Constant",
							type: "injector",
							datatype: "Number",
							value: 2,
						},
					}

					const localStorageVar: VariableMap = {
						a: {
							tag: "FromLocalStorage",
							type: "injector",
							datatype: "Number",
							key: "savedValue",
							defaultValue: value,
						},
						b: {
							tag: "Constant",
							type: "injector",
							datatype: "Number",
							value: 2,
						},
					}

					const result1 = parseFormula("a + b", constantVar)
					const result2 = parseFormula("a + b", elementVar)
					const result3 = parseFormula("a + b", localStorageVar)

					// All should parse successfully
					assertEquals(result1.ok, true)
					assertEquals(result2.ok, true)
					assertEquals(result3.ok, true)

					// Each should use the correct injector
					if (result1.ok && result1.value.tag === "Add") {
						assertEquals(result1.value.addends[0], constantVar.a)
					}
					if (result2.ok && result2.value.tag === "Add") {
						assertEquals(result2.value.addends[0], elementVar.a)
					}
					if (result3.ok && result3.value.tag === "Add") {
						assertEquals(result3.value.addends[0], localStorageVar.a)
					}
				}),
			)
		})
	})
})
