import { assertEquals } from "@std/assert"
import fc from "fast-check"

import makeCompositeKey from "./index.ts"

Deno.test("makeCompositeKey - creates key from two codes", () => {
	const key = makeCompositeKey(0x003c)(0x003d)
	assertEquals(key, "0x003C_0x003D")
})

Deno.test("makeCompositeKey - handles zero as second code", () => {
	const key = makeCompositeKey(0x2264)(0x0000)
	assertEquals(key, "0x2264_0x0000")
})

Deno.test("makeCompositeKey - uses uppercase hex", () => {
	const key = makeCompositeKey(0x00ab)(0x00cd)
	assertEquals(key, "0x00AB_0x00CD")
})

Deno.test("makeCompositeKey - handles small codes", () => {
	const key = makeCompositeKey(0x0001)(0x0002)
	assertEquals(key, "0x0001_0x0002")
})

Deno.test("makeCompositeKey - curried application works", () => {
	const withFirst = makeCompositeKey(0x003c)
	const result = withFirst(0x003d)
	assertEquals(result, "0x003C_0x003D")
})

Deno.test("makeCompositeKey - property: always includes underscore", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0x20, max: 0xFF }),
			fc.integer({ min: 0x20, max: 0xFF }),
			(code1: number, code2: number) => {
				const key = makeCompositeKey(code1)(code2)
				return key.includes("_")
			},
		),
	)
})

Deno.test("makeCompositeKey - property: deterministic", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0x20, max: 0xFF }),
			fc.integer({ min: 0x20, max: 0xFF }),
			(code1: number, code2: number) => {
				const key1 = makeCompositeKey(code1)(code2)
				const key2 = makeCompositeKey(code1)(code2)
				return key1 === key2
			},
		),
	)
})

Deno.test("makeCompositeKey - property: unique for different pairs", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0x20, max: 0xFF }),
			fc.integer({ min: 0x20, max: 0xFF }),
			fc.integer({ min: 0x20, max: 0xFF }),
			(code1: number, code2: number, code3: number) => {
				fc.pre(code2 !== code3) // Precondition: codes must be different
				const key1 = makeCompositeKey(code1)(code2)
				const key2 = makeCompositeKey(code1)(code3)
				return key1 !== key2
			},
		),
	)
})
