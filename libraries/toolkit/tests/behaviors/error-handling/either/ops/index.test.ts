import { assert, assertEquals } from "../../../../../deps/asserts.ts"

// deno-lint-ignore no-explicit-any
declare const Deno: any

import bimap from "../../../../../src/monads/either/bimap/index.ts"
import chain from "../../../../../src/monads/either/chain/index.ts"
import fromNullable from "../../../../../src/monads/either/fromNullable/index.ts"
import getOrElse from "../../../../../src/monads/either/getOrElse/index.ts"
import isLeft from "../../../../../src/monads/either/isLeft/index.ts"
import isRight from "../../../../../src/monads/either/isRight/index.ts"
import left from "../../../../../src/monads/either/left/index.ts"
import mapLeft from "../../../../../src/monads/either/mapLeft/index.ts"
import orElse from "../../../../../src/monads/either/orElse/index.ts"
import right from "../../../../../src/monads/either/right/index.ts"
import tryCatch from "../../../../../src/monads/either/tryCatch/index.ts"

Deno.test("Either - mapLeft transforms Left and leaves Right", () => {
	const up = (s: string) => s.toUpperCase()

	const l = left<string, number>("boom")
	const r = right<number, string>(42)

	assertEquals(mapLeft<string, string>(up)(l), left("BOOM"))
	assertEquals(mapLeft<string, string>(up)(r), r)
})

Deno.test("Either - bimap maps both sides appropriately", () => {
 const up = (s: string) => s.toUpperCase()
 const inc = (n: number) => n + 1

 const run = bimap<string, string, number, number>(up)(inc)

 assertEquals(run(left("x")), left("X"))
 assertEquals(run(right(1)), right(2))
})

Deno.test("Either - orElse uses fallback only on Left (value and lazy forms)", () => {
	const primaryLeft = left<string, number>("bad")
	const primaryRight = right<number, string>(7)
	const fallbackVal = right<number, string>(100)
	const fallbackLazy = () => right<number, string>(200)

	assertEquals(orElse()<string>(fallbackVal)(primaryLeft), fallbackVal)
	assertEquals(orElse()<string>(fallbackLazy)(primaryLeft), right(200))

	// Right stays as-is
	assertEquals(orElse()<string>(fallbackVal)(primaryRight), primaryRight)
	assertEquals(orElse()<string>(fallbackLazy)(primaryRight), primaryRight)
})

Deno.test("Either - tryCatch returns Right on success, Left on error", () => {
 const toMsg = (u: unknown) => u instanceof Error ? u.message : String(u)
 const good = () => 10
 const bad = () => {
 	throw new Error("explode")
 }

 assertEquals(tryCatch(good)(toMsg), right(10))
 assertEquals(tryCatch(bad)(toMsg), left("explode"))
})

Deno.test("Either - fromNullable maps null/undefined to Left and others to Right", () => {
	const mk = fromNullable<string, number>("missing")

	assertEquals(mk(null), left("missing"))
	assertEquals(mk(undefined), left("missing"))
	assertEquals(mk(0 as unknown as number), right(0 as unknown as number))
	assertEquals(mk(42), right(42))
})

Deno.test("Either - guards narrow types in branches", () => {
	const v = Math.random() > 0.5
		? right<number, string>(1)
		: left<string, number>("x")

	if (isRight(v)) {
		assert(true) // Narrowed to Right
	} else if (isLeft(v)) {
		assert(true) // Narrowed to Left
	}
})

Deno.test("Either - getOrElse extracts Right or uses default on Left", () => {
	const d = getOrElse(99)

	assertEquals(d(right<number, string>(5)), 5)
	assertEquals(d(left<string, number>("nope")), 99)
})


Deno.test("Either - chain with orElse fallback composition", () => {
	const parseIntE = (s: string) => {
		const n = Number.parseInt(s, 10)
		return Number.isNaN(n)
			? left<string, number>("nan")
			: right<number, string>(n)
	}
	const double = (n: number) => right<number, string>(n * 2)

	// bad: fallback kicks in
	const bad = orElse()<string>(right<number, string>(0))(chain(double)(parseIntE("abc")))
	assertEquals(bad, right(0))

	// good path
	const good = orElse()<string>(right<number, string>(0))(chain(double)(parseIntE("5")))
	assertEquals(good, right(10))
})
