import { assertEquals } from "@std/assert"

import {
	EIGHT_DECIMAL_PLACES_SCALE,
	FOUR_DECIMAL_PLACES_SCALE,
	ONE_DECIMAL_PLACE_SCALE,
	THREE_DECIMAL_PLACES_SCALE,
	TWO_DECIMAL_PLACES_SCALE,
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

Deno.test("TWO_DECIMAL_PLACES_SCALE is 2 decimal places", () => {
	assertEquals(TWO_DECIMAL_PLACES_SCALE, 2)
})

Deno.test("ONE_DECIMAL_PLACE_SCALE is 1 decimal place", () => {
	assertEquals(ONE_DECIMAL_PLACE_SCALE, 1)
})

Deno.test("THREE_DECIMAL_PLACES_SCALE is 3 decimal places", () => {
	assertEquals(THREE_DECIMAL_PLACES_SCALE, 3)
})

Deno.test("FOUR_DECIMAL_PLACES_SCALE is 4 decimal places", () => {
	assertEquals(FOUR_DECIMAL_PLACES_SCALE, 4)
})

Deno.test("EIGHT_DECIMAL_PLACES_SCALE is 8 decimal places", () => {
	assertEquals(EIGHT_DECIMAL_PLACES_SCALE, 8)
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
