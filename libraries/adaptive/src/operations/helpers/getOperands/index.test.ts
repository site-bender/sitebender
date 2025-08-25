import { assertEquals } from "jsr:@std/assert"
import fc from "npm:fast-check"

import getOperands from "./index.ts"

// Mock operation types for testing
const createMockOperatorWithOperands = (operands: any[]) => ({
	type: "operator" as const,
	tag: "Add" as const,
	datatype: "Number" as const,
	operands,
})

const createMockOperatorWithoutOperands = () => ({
	type: "operator" as const,
	tag: "AbsoluteValue" as const,
	datatype: "Number" as const,
	operand: { type: "injector", tag: "Constant", value: 5 },
})

const createMockComparatorWithOperands = (operands: any[]) => ({
	type: "comparator" as const,
	tag: "IsEqualTo" as const,
	comparison: "equality" as const,
	operands,
})

const createMockComparatorWithoutOperands = () => ({
	type: "comparator" as const,
	tag: "IsBoolean" as const,
	comparison: "scalar" as const,
	operand: { type: "injector", tag: "Constant", value: true },
})

const createMockInjector = (value: any) => ({
	type: "injector" as const,
	tag: "Constant" as const,
	datatype: "Number" as const,
	value,
})

Deno.test("getOperands basic functionality", async (t) => {
	await t.step("should return empty array for empty operations list", () => {
		const result = getOperands([])
		assertEquals(result, [])
	})

	await t.step("should extract operands from single operator", () => {
		const operand1 = createMockInjector(5)
		const operand2 = createMockInjector(10)
		const operation = createMockOperatorWithOperands([operand1, operand2])

		const result = getOperands([operation])
		assertEquals(result, [operand1, operand2])
	})

	await t.step("should extract operands from single comparator", () => {
		const operand1 = createMockInjector(5)
		const operand2 = createMockInjector(5)
		const operation = createMockComparatorWithOperands([operand1, operand2])

		const result = getOperands([operation])
		assertEquals(result, [operand1, operand2])
	})

	await t.step("should handle operations without operands array", () => {
		const operation1 = createMockOperatorWithoutOperands()
		const operation2 = createMockComparatorWithoutOperands()

		const result = getOperands([operation1, operation2])
		assertEquals(result, [])
	})
})

Deno.test("getOperands multiple operations", async (t) => {
	await t.step("should extract operands from multiple operations", () => {
		const operand1 = createMockInjector(1)
		const operand2 = createMockInjector(2)
		const operand3 = createMockInjector(3)
		const operand4 = createMockInjector(4)

		const operation1 = createMockOperatorWithOperands([operand1, operand2])
		const operation2 = createMockComparatorWithOperands([operand3, operand4])

		const result = getOperands([operation1, operation2])
		assertEquals(result, [operand1, operand2, operand3, operand4])
	})

	await t.step(
		"should handle mixed operations with and without operands",
		() => {
			const operand1 = createMockInjector(1)
			const operand2 = createMockInjector(2)

			const operation1 = createMockOperatorWithOperands([operand1, operand2])
			const operation2 = createMockOperatorWithoutOperands()
			const operation3 = createMockComparatorWithoutOperands()
			const operation4 = createMockComparatorWithOperands([
				createMockInjector(3),
			])

			const result = getOperands([
				operation1,
				operation2,
				operation3,
				operation4,
			])
			assertEquals(result, [operand1, operand2, createMockInjector(3)])
		},
	)

	await t.step("should preserve order of operands", () => {
		const operand1 = createMockInjector("first")
		const operand2 = createMockInjector("second")
		const operand3 = createMockInjector("third")
		const operand4 = createMockInjector("fourth")

		const operation1 = createMockOperatorWithOperands([operand1, operand2])
		const operation2 = createMockComparatorWithOperands([operand3, operand4])

		const result = getOperands([operation1, operation2])
		assertEquals(result, [operand1, operand2, operand3, operand4])
	})
})

Deno.test("getOperands edge cases", async (t) => {
	await t.step("should handle operations with empty operands array", () => {
		const operation1 = createMockOperatorWithOperands([])
		const operation2 = createMockComparatorWithOperands([])

		const result = getOperands([operation1, operation2])
		assertEquals(result, [])
	})

	await t.step("should handle single operand in array", () => {
		const operand = createMockInjector(42)
		const operation = createMockOperatorWithOperands([operand])

		const result = getOperands([operation])
		assertEquals(result, [operand])
	})

	await t.step("should handle many operands in single operation", () => {
		const operands = Array.from({ length: 10 }, (_, i) => createMockInjector(i))
		const operation = createMockOperatorWithOperands(operands)

		const result = getOperands([operation])
		assertEquals(result, operands)
	})

	await t.step("should handle null/undefined operands gracefully", () => {
		const operationWithNull = {
			type: "operator" as const,
			tag: "Add" as const,
			datatype: "Number" as const,
			operands: null,
		}

		const operationWithUndefined = {
			type: "operator" as const,
			tag: "Add" as const,
			datatype: "Number" as const,
			// No operands property
		}

		const result1 = getOperands([operationWithNull as any])
		const result2 = getOperands([operationWithUndefined as any])

		assertEquals(result1, [])
		assertEquals(result2, [])
	})
})

Deno.test("getOperands with complex nested structures", async (t) => {
	await t.step("should handle nested operator operands", () => {
		const innerOperand1 = createMockInjector(1)
		const innerOperand2 = createMockInjector(2)
		const nestedOperator = createMockOperatorWithOperands([
			innerOperand1,
			innerOperand2,
		])

		const outerOperand = createMockInjector(3)
		const outerOperation = createMockOperatorWithOperands([
			nestedOperator,
			outerOperand,
		])

		const result = getOperands([outerOperation])
		assertEquals(result, [nestedOperator, outerOperand])
	})

	await t.step("should handle mixed types of operands", () => {
		const injectorOperand = createMockInjector(5)
		const operatorOperand = createMockOperatorWithOperands([
			createMockInjector(10),
		])
		const comparatorOperand = createMockComparatorWithOperands([
			createMockInjector(15),
		])

		const operation = createMockOperatorWithOperands([
			injectorOperand,
			operatorOperand,
			comparatorOperand,
		])

		const result = getOperands([operation])
		assertEquals(result, [injectorOperand, operatorOperand, comparatorOperand])
	})
})

Deno.test("getOperands realistic scenarios", async (t) => {
	await t.step("should handle mathematical expression scenario", () => {
		// Represents: (a + b) * (c - d) where a, b, c, d are constants
		const constA = createMockInjector(5)
		const constB = createMockInjector(3)
		const constC = createMockInjector(10)
		const constD = createMockInjector(2)

		const addOperation = createMockOperatorWithOperands([constA, constB])
		const subtractOperation = createMockOperatorWithOperands([constC, constD])
		const multiplyOperation = createMockOperatorWithOperands([
			addOperation,
			subtractOperation,
		])

		const result = getOperands([multiplyOperation])
		assertEquals(result, [addOperation, subtractOperation])
	})

	await t.step("should handle comparison chain scenario", () => {
		// Represents: value1 > value2 AND value3 < value4
		const value1 = createMockInjector(10)
		const value2 = createMockInjector(5)
		const value3 = createMockInjector(3)
		const value4 = createMockInjector(8)

		const greaterThan = createMockComparatorWithOperands([value1, value2])
		const lessThan = createMockComparatorWithOperands([value3, value4])
		const andOperation = {
			type: "comparator" as const,
			tag: "And" as const,
			comparison: "algebraic" as const,
			operands: [greaterThan, lessThan],
		}

		const result = getOperands([andOperation])
		assertEquals(result, [greaterThan, lessThan])
	})

	await t.step("should handle form validation scenario", () => {
		// Represents multiple field validations
		const emailField = createMockInjector("user@example.com")
		const nameField = createMockInjector("John Doe")
		const ageField = createMockInjector(25)

		const emailValidation = createMockComparatorWithOperands([emailField])
		const nameValidation = createMockComparatorWithOperands([nameField])
		const ageValidation = createMockComparatorWithOperands([ageField])

		const operations = [emailValidation, nameValidation, ageValidation]
		const result = getOperands(operations)
		assertEquals(result, [emailField, nameField, ageField])
	})
})

Deno.test("getOperands property-based tests", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 1, max: 100 })),
			(values) => {
				const operands = values.map((v) => createMockInjector(v))
				const operation = createMockOperatorWithOperands(operands)

				const result = getOperands([operation])
				assertEquals(result.length, values.length)
				assertEquals(result, operands)
			},
		),
		{ numRuns: 100 },
	)

	fc.assert(
		fc.property(
			fc.array(fc.array(fc.integer({ min: 1, max: 20 })), {
				minLength: 1,
				maxLength: 10,
			}),
			(operandGroups) => {
				const operations = operandGroups.map((group) => {
					const operands = group.map((v) => createMockInjector(v))
					return createMockOperatorWithOperands(operands)
				})

				const result = getOperands(operations)
				const expectedLength = operandGroups.reduce(
					(sum, group) => sum + group.length,
					0,
				)
				assertEquals(result.length, expectedLength)
			},
		),
		{ numRuns: 50 },
	)

	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 10 }),
			fc.integer({ min: 0, max: 10 }),
			(withOperandsCount, withoutOperandsCount) => {
				const operationsWithOperands = Array.from(
					{ length: withOperandsCount },
					() => createMockOperatorWithOperands([createMockInjector(1)]),
				)
				const operationsWithoutOperands = Array.from({
					length: withoutOperandsCount,
				}, () => createMockOperatorWithoutOperands())

				const allOperations = [
					...operationsWithOperands,
					...operationsWithoutOperands,
				]
				const result = getOperands(allOperations)

				assertEquals(result.length, withOperandsCount) // Only operations with operands contribute
			},
		),
		{ numRuns: 50 },
	)
})

Deno.test("getOperands performance characteristics", async (t) => {
	await t.step("should handle large number of operations efficiently", () => {
		const operations = Array.from({ length: 1000 }, (_, i) => {
			const operands = [createMockInjector(i), createMockInjector(i + 1)]
			return createMockOperatorWithOperands(operands)
		})

		const start = performance.now()
		const result = getOperands(operations)
		const end = performance.now()

		assertEquals(result.length, 2000) // 1000 operations * 2 operands each
		console.log(`Processing 1000 operations took ${end - start} milliseconds`)
	})

	await t.step(
		"should handle operations with many operands efficiently",
		() => {
			const manyOperands = Array.from(
				{ length: 1000 },
				(_, i) => createMockInjector(i),
			)
			const operation = createMockOperatorWithOperands(manyOperands)

			const start = performance.now()
			const result = getOperands([operation])
			const end = performance.now()

			assertEquals(result.length, 1000)
			console.log(
				`Processing 1 operation with 1000 operands took ${
					end - start
				} milliseconds`,
			)
		},
	)
})
