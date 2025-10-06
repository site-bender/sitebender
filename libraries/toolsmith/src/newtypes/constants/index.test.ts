import { assertEquals } from "@std/assert"

import {
	CURRENCY_SCALE,
	DECIMAL0_SCALE,
	DECIMAL1_SCALE,
	DECIMAL3_SCALE,
	DECIMAL4_SCALE,
	DECIMAL8_SCALE,
	MAX_SAFE_INTEGER,
	MIN_SAFE_INTEGER,
	PERCENTAGE_MAX,
	PERCENTAGE_MIN,
	PERCENTAGE_SCALE,
} from "./index.ts"

Deno.test("MAX_SAFE_INTEGER matches JavaScript constant", () => {
	assertEquals(MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
	assertEquals(MAX_SAFE_INTEGER, 9007199254740991)
})

Deno.test("MIN_SAFE_INTEGER matches JavaScript constant", () => {
	assertEquals(MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
	assertEquals(MIN_SAFE_INTEGER, -9007199254740991)
})

Deno.test("CURRENCY_SCALE is 2 decimal places", () => {
	assertEquals(CURRENCY_SCALE, 2)
})

Deno.test("DECIMAL0_SCALE is 0 decimal places", () => {
	assertEquals(DECIMAL0_SCALE, 0)
})

Deno.test("DECIMAL1_SCALE is 1 decimal place", () => {
	assertEquals(DECIMAL1_SCALE, 1)
})

Deno.test("DECIMAL3_SCALE is 3 decimal places", () => {
	assertEquals(DECIMAL3_SCALE, 3)
})

Deno.test("DECIMAL4_SCALE is 4 decimal places", () => {
	assertEquals(DECIMAL4_SCALE, 4)
})

Deno.test("DECIMAL8_SCALE is 8 decimal places", () => {
	assertEquals(DECIMAL8_SCALE, 8)
})

Deno.test("PERCENTAGE_MIN is 0 (0%)", () => {
	assertEquals(PERCENTAGE_MIN, 0)
})

Deno.test("PERCENTAGE_MAX is 1 (100%)", () => {
	assertEquals(PERCENTAGE_MAX, 1)
})

Deno.test("PERCENTAGE_SCALE is 4 decimal places", () => {
	assertEquals(PERCENTAGE_SCALE, 4)
})
