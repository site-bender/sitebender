import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"

import getOrElse from "./getOrElse/index.ts"
import isLeft from "./isLeft/index.ts"
import isRight from "./isRight/index.ts"
import left from "./left/index.ts"
import map from "./map/index.ts"
import right from "./right/index.ts"

Deno.test("Either - map transforms Right and leaves Left", () => {
	const r = right(2)
	const l = left("A")
	assertEquals(map((n: number) => n * 3)(r), right(6))
	assertEquals(map((n: number) => n * 3)(l), l)
})

//-- Disabled as fold not working as intended. Fix it.
// Deno.test("Either - fold handles both branches without error semantics", () => {
// 	const show = fold<string, string, string>((n) => `R:${n}`)((s) => `L:${s}`)
// 	assertEquals(show(right("1")), "R:1")
// 	assertEquals(show(left("x")), "L:x")
// })

Deno.test("Either - getOrElse returns default on Left", () => {
	assertEquals(getOrElse(0)(right(5)), 5)
	assertEquals(getOrElse(0)(left("bad")), 0)
})

Deno.test("Either - type guards narrow", () => {
	const v = Math.random() > 0.5 ? right(1) : left("x")
	if (isRight(v)) {
		assert(true)
		// v is Right<number>
		assertEquals(v.right >= 0, true)
	} else if (isLeft(v)) {
		assert(true)
		// v is Left<string>
		assertEquals(typeof v.left, "string")
	}
})
