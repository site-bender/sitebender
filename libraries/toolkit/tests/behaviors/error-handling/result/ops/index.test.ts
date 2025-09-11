import { assert, assertEquals } from "../../../../../deps/asserts.ts"

// Silence editor if global Deno type not resolved (runtime provides it)
// deno-lint-ignore no-explicit-any
declare const Deno: any

import bimap from "../../../../../src/monads/result/bimap/index.ts"
import err from "../../../../../src/monads/result/err/index.ts"
import getOrElse from "../../../../../src/monads/result/getOrElse/index.ts"
import isErr from "../../../../../src/monads/result/isErr/index.ts"
import isOk from "../../../../../src/monads/result/isOk/index.ts"
import map from "../../../../../src/monads/result/map/index.ts"
import mapErr from "../../../../../src/monads/result/mapErr/index.ts"
import ok from "../../../../../src/monads/result/ok/index.ts"
import tryCatch from "../../../../../src/monads/result/tryCatch/index.ts"

Deno.test("Result - guards narrow types in branches", () => {
	const v = Math.random() > 0.5
		? ok<number, string>(1)
		: err<string, number>("x")

	if (isOk(v)) {
		assert(true)
	} else if (isErr(v)) {
		assert(true)
	}
})

Deno.test("Result - getOrElse returns default for Err only", () => {
	const withDefault = getOrElse(123)

	assertEquals(withDefault(ok<number, string>(5)), 5)
	assertEquals(withDefault(err<string, number>("bad")), 123)
})

Deno.test("Result - bimap and mapErr/map behave as expected", () => {
	const up = (s: string) => s.toUpperCase()
	const inc = (n: number) => n + 1

	assertEquals(bimap<string, string, number, number>(up, inc)(ok(1)), ok(2))
	assertEquals(
		bimap<string, string, number, number>(up, inc)(err("e")),
		err("E"),
	)

	assertEquals(map<number, number>(inc)(ok(1)), ok(2))
	assertEquals(map<number, number>(inc)(err("e")), err("e"))

	assertEquals(mapErr<string, string>(up)(err("e")), err("E"))
	assertEquals(mapErr<string, string>(up)(ok(1)), ok(1))
})

Deno.test("Result - tryCatch maps thrown exceptions to Err", () => {
	const toMsg = (u: unknown) => (u instanceof Error ? u.message : String(u))
	const good = () => 10
	const bad = () => {
		throw new Error("boom")
	}

	assertEquals(tryCatch(good, toMsg), ok(10))
	assertEquals(tryCatch(bad, toMsg), err("boom"))
})

Deno.test("Result - basic interop: mapping then default extraction", () => {
	const res = map<number, number>((n) => n * 3)(ok<number, string>(4))

	const value = getOrElse(0)(res)
	assertEquals(value, 12)
})
