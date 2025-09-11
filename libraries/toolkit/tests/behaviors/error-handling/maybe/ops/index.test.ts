import { assert, assertEquals } from "../../../../../deps/asserts.ts"

// deno-lint-ignore no-explicit-any
declare const Deno: any

import filter from "../../../../../src/monads/maybe/filter/index.ts"
import fold from "../../../../../src/monads/maybe/fold/index.ts"
import fromNullable from "../../../../../src/monads/maybe/fromNullable/index.ts"
import getOrElse from "../../../../../src/monads/maybe/getOrElse/index.ts"
import isJust from "../../../../../src/monads/maybe/isJust/index.ts"
import isNothing from "../../../../../src/monads/maybe/isNothing/index.ts"
import just from "../../../../../src/monads/maybe/just/index.ts"
import nothing from "../../../../../src/monads/maybe/nothing/index.ts"
import toEither from "../../../../../src/monads/maybe/toEither/index.ts"
import toNullable from "../../../../../src/monads/maybe/toNullable/index.ts"

Deno.test("Maybe - fromNullable/toNullable round-trip for non-null primitive values", () => {
	const values: unknown[] = [0, 1, -1, "", "hi", true, false]
	for (const v of values) {
		const m = fromNullable(v)
		assertEquals(toNullable(m), v)
	}
})

Deno.test("Maybe - fromNullable produces Nothing for null/undefined", () => {
	assertEquals(fromNullable(null), nothing())
	assertEquals(fromNullable(undefined), nothing())
})

Deno.test("Maybe - toEither maps Nothing with provided error and Just to Right", () => {
	const err = () => "missing"
	assertEquals(toEither(err)(just(5)), { _tag: "Right", right: 5 })
	assertEquals(toEither(err)(nothing()), { _tag: "Left", left: "missing" })
})

Deno.test("Maybe - filter keeps Just when predicate true, otherwise Nothing", () => {
	const isEven = (n: number) => n % 2 === 0

	assertEquals(filter<number>(isEven)(just(4)), just(4))
	assertEquals(filter<number>(isEven)(just(3)), nothing())
	assertEquals(filter<number>(isEven)(nothing()), nothing())
})

Deno.test("Maybe - guards narrow types in branches", () => {
	const v = Math.random() > 0.5 ? just(1) : nothing()

	if (isJust(v)) {
		assert(true)
		assertEquals(typeof v.value, "number")
	} else if (isNothing(v)) {
		assert(true)
	}
})

Deno.test("Maybe - fold and getOrElse behave as expected", () => {
	const show = fold<number, string>(() => "none")((n) => `n=${n}`)

	assertEquals(show(just(2)), "n=2")
	assertEquals(show(nothing()), "none")

	const d = getOrElse(() => 99)

	assertEquals(d(just(7)), 7)
	assertEquals(d(nothing()), 99)
})
