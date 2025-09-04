import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import isFutureDateTime from "../../../../src/simple/validation/isFutureDateTime/index.ts"

Deno.test("isFutureDateTime: true for future timestamp, false for past", () => {
  assertEquals(isFutureDateTime("2099-01-01T12:00:00"), true)
  assertEquals(isFutureDateTime("1970-01-01T00:00:00Z"), false)
})

Deno.test("isFutureDateTime: accepts Date inputs; invalid returns false", () => {
  assertEquals(isFutureDateTime(new Date("2099-12-31T23:59:59Z")), true)
  assertEquals(isFutureDateTime(new Date("1970-01-01T00:00:00Z")), false)
  assertEquals(isFutureDateTime("not-a-datetime" as unknown as string), false)
  assertEquals(isFutureDateTime(null), false)
  assertEquals(isFutureDateTime(undefined), false)
})
