import { assertEquals } from "@std/assert"

import tap from "./index.ts"

Deno.test("tap", async (t) => {
	await t.step("executes side effect and returns value unchanged", () => {
		let sideEffect = 0
		const tapFn = tap(function incrementSideEffect(_value: number): void {
			sideEffect++
		})

		const result = tapFn(42)

		assertEquals(result, 42)
		assertEquals(sideEffect, 1)
	})

	await t.step("side effect receives the value", () => {
		let receivedValue: number | undefined

		const tapFn = tap(function captureValue(value: number): void {
			receivedValue = value
		})

		tapFn(100)

		assertEquals(receivedValue, 100)
	})

	await t.step("returns value without modification", () => {
		type Point = { readonly x: number; readonly y: number }

		const tapFn = tap(function attemptModify(_value: Point): void {
			// Side effect that attempts to modify (should not affect return)
		})

		const originalValue: Point = { x: 1, y: 2 }
		const result = tapFn(originalValue)

		assertEquals(result, originalValue)
		assertEquals(result.x, 1)
		assertEquals(result.y, 2)
	})

	await t.step("works with different types", () => {
		const stringValues: Array<string> = []
		const tapString = tap(function captureString(value: string): void {
			stringValues.push(value)
		})

		const numberValues: Array<number> = []
		const tapNumber = tap(function captureNumber(value: number): void {
			numberValues.push(value)
		})

		tapString("hello")
		tapNumber(42)

		assertEquals(stringValues, ["hello"])
		assertEquals(numberValues, [42])
	})

	await t.step("works with objects", () => {
		const objects: Array<{ name: string }> = []
		const tapObj = tap(function captureObject(value: { name: string }): void {
			objects.push(value)
		})

		const obj = { name: "test" }
		const result = tapObj(obj)

		assertEquals(result, obj)
		assertEquals(objects.length, 1)
		assertEquals(objects[0], obj)
	})

	await t.step("works with arrays", () => {
		let arrayLength = 0
		const tapArr = tap(function getArrayLength(value: Array<number>): void {
			arrayLength = value.length
		})

		const arr = [1, 2, 3, 4, 5]
		const result = tapArr(arr)

		assertEquals(result, arr)
		assertEquals(arrayLength, 5)
	})

	await t.step("can be used in function composition", () => {
		const logs: Array<string> = []

		const logTap = tap(function logValue(value: string): void {
			logs.push(`Logged: ${value}`)
		})

		const toUpper = function toUpperCase(str: string): string {
			return str.toUpperCase()
		}

		const pipeline = function procesString(str: string): string {
			const tapped = logTap(str)
			return toUpper(tapped)
		}

		const result = pipeline("hello")

		assertEquals(result, "HELLO")
		assertEquals(logs, ["Logged: hello"])
	})

	await t.step("can perform multiple side effects", () => {
		let counter = 0
		const logs: Array<number> = []

		const tapFn = tap(function performSideEffects(value: number): void {
			counter++
			logs.push(value)
		})

		tapFn(10)
		tapFn(20)
		tapFn(30)

		assertEquals(counter, 3)
		assertEquals(logs, [10, 20, 30])
	})

	await t.step("handles null and undefined", () => {
		let nullReceived = false
		let undefinedReceived = false

		const tapNull = tap(function checkNull(value: null): void {
			nullReceived = value === null
		})

		const tapUndefined = tap(function checkUndefined(value: undefined): void {
			undefinedReceived = value === undefined
		})

		tapNull(null)
		tapUndefined(undefined)

		assertEquals(nullReceived, true)
		assertEquals(undefinedReceived, true)
	})

	await t.step("is curried properly", () => {
		const tapFn = tap(function sideEffect(_value: number): void {
			// Side effect
		})

		assertEquals(typeof tapFn, "function")

		const result = tapFn(42)
		assertEquals(typeof result, "number")
	})
})
