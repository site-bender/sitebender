import { assertEquals } from "@std/assert"

import {
	EXACT_EIGHT_DECIMALS_SCALE,
	EXACT_FOUR_DECIMALS_SCALE,
	EXACT_ONE_DECIMAL_SCALE,
	EXACT_THREE_DECIMALS_SCALE,
	EXACT_TWO_DECIMALS_SCALE,
	MAX_SAFE_INTEGER,
	MIN_SAFE_INTEGER,
	PERCENT_MAX,
	PERCENT_MIN,
	PERCENT_SCALE,
} from "./index.ts"

Deno.test("MAX_SAFE_INTEGER matches JavaScript constant", () => {
	assertEquals(MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
	assertEquals(MAX_SAFE_INTEGER, 9007199254740991)
})

Deno.test("MIN_SAFE_INTEGER matches JavaScript constant", () => {
	assertEquals(MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
	assertEquals(MIN_SAFE_INTEGER, -9007199254740991)
})

Deno.test("EXACT_TWO_DECIMALS_SCALE is 2 decimal places", () => {
	assertEquals(EXACT_TWO_DECIMALS_SCALE, 2)
})

Deno.test("EXACT_ONE_DECIMAL_SCALE is 1 decimal place", () => {
	assertEquals(EXACT_ONE_DECIMAL_SCALE, 1)
})

Deno.test("EXACT_THREE_DECIMALS_SCALE is 3 decimal places", () => {
	assertEquals(EXACT_THREE_DECIMALS_SCALE, 3)
})

Deno.test("EXACT_FOUR_DECIMALS_SCALE is 4 decimal places", () => {
	assertEquals(EXACT_FOUR_DECIMALS_SCALE, 4)
})

Deno.test("EXACT_EIGHT_DECIMALS_SCALE is 8 decimal places", () => {
	assertEquals(EXACT_EIGHT_DECIMALS_SCALE, 8)
})

Deno.test("PERCENT_MIN is 0 (0%)", () => {
	assertEquals(PERCENT_MIN, 0)
})

Deno.test("PERCENT_MAX is 1 (100%)", () => {
	assertEquals(PERCENT_MAX, 1)
})

Deno.test("PERCENT_SCALE is 4 decimal places", () => {
	assertEquals(PERCENT_SCALE, 4)
})
