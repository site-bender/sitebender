import { Temporal } from "temporal-polyfill"
import { expect, test } from "vitest"

import castToPlainTime from "./"

test("[castToPlainTime] (utilities::castValue) casts value to Right(PlainTime)", async () => {
	expect(castToPlainTime("12:00:00")?.right?.toString()).toEqual("12:00:00")
	expect(
		castToPlainTime(Temporal.PlainTime.from("07:00:00"))?.right?.toString(),
	).toEqual("07:00:00")
})

test("[castToPlainTime] (utilities::castValue) returns Left(Array(Errors)) if uncastable", () => {
	expect(castToPlainTime("grizmo")).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Cannot cast grizmo to a plain time: Cannot parse: grizmo.",
				operation: "grizmo",
				type: "castToPlainTime",
			},
		],
	})
})
