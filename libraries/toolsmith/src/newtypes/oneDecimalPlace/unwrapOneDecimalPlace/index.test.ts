import { assertEquals } from "@std/assert"

import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

import unwrapOneDecimalPlace from "./index.ts"

Deno.test("unwrapOneDecimalPlace extracts number from OneDecimalPlace whole number", () => {
	const oneDecimalPlaceValue = 100 as OneDecimalPlace
	const result: number = unwrapOneDecimalPlace(oneDecimalPlaceValue)

	assertEquals(result, 100)
})

Deno.test("unwrapOneDecimalPlace extracts number from OneDecimalPlace zero", () => {
	const oneDecimalPlaceValue = 0 as OneDecimalPlace
	const result: number = unwrapOneDecimalPlace(oneDecimalPlaceValue)

	assertEquals(result, 0)
})

Deno.test("unwrapOneDecimalPlace extracts number from OneDecimalPlace negative", () => {
	const oneDecimalPlaceValue = -50 as OneDecimalPlace
	const result: number = unwrapOneDecimalPlace(oneDecimalPlaceValue)

	assertEquals(result, -50)
})

Deno.test("unwrapOneDecimalPlace extracts number from OneDecimalPlace with 1 decimal place", () => {
	const oneDecimalPlaceValue = 10.5 as OneDecimalPlace
	const result: number = unwrapOneDecimalPlace(oneDecimalPlaceValue)

	assertEquals(result, 10.5)
})

Deno.test("unwrapOneDecimalPlace extracts number from OneDecimalPlace negative with 1 decimal", () => {
	const oneDecimalPlaceValue = -19.9 as OneDecimalPlace
	const result: number = unwrapOneDecimalPlace(oneDecimalPlaceValue)

	assertEquals(result, -19.9)
})

Deno.test("unwrapOneDecimalPlace extracts number from OneDecimalPlace small decimal", () => {
	const oneDecimalPlaceValue = 0.1 as OneDecimalPlace
	const result: number = unwrapOneDecimalPlace(oneDecimalPlaceValue)

	assertEquals(result, 0.1)
})
