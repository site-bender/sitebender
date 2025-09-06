import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import isAfterDate from "../../../../src/simple/validation/isAfterDate/index.ts"

Deno.test("isAfterDate: returns true only when strictly after the reference", () => {
	const after2000 = isAfterDate("2000-01-01")
	assertEquals(after2000("2000-01-02"), true)
	assertEquals(after2000("2000-01-01"), false)
	assertEquals(after2000("1999-12-31"), false)
})

Deno.test("isAfterDate: accepts mixed input types and is safe on invalid", () => {
	const isAfter = isAfterDate(new Date("1999-12-31T00:00:00Z"))
	assertEquals(isAfter("2000-01-01"), true)
	assertEquals(isAfter("not-a-date" as unknown as string), false)
	assertEquals(isAfter(null), false)
	assertEquals(isAfter(undefined), false)
})
