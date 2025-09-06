import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import isFutureDate from "../../../../src/simple/validation/isFutureDate/index.ts"

Deno.test("isFutureDate: detects obviously future and past calendar dates", () => {
	// Use stable anchors to avoid timezone/today variance
	assertEquals(isFutureDate("2099-01-01"), true)
	assertEquals(isFutureDate("1970-01-01"), false)
})

Deno.test("isFutureDate: accepts Date and ISO inputs; invalid returns false", () => {
	const futureDate = new Date("2099-01-01T00:00:00Z")
	const pastDate = new Date("1970-01-01T00:00:00Z")

	assertEquals(isFutureDate(futureDate), true)
	assertEquals(isFutureDate(pastDate), false)
	assertEquals(isFutureDate("not-a-date" as unknown as string), false)
	assertEquals(isFutureDate(null), false)
	assertEquals(isFutureDate(undefined), false)
})
