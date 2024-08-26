import { Temporal } from "temporal-polyfill"
import { expect, test } from "vitest"

import castToZonedDateTime from "./"

test("[castToZonedDateTime] (utilities::castValue) casts value to Right(ZonedDateTime)", async () => {
	expect(
		castToZonedDateTime("2020-08-05T20:06:13+05:45[+05:45]")?.right?.toString(),
	).toEqual("2020-08-05T20:06:13+05:45[+05:45]")
	expect(
		castToZonedDateTime(
			Temporal.ZonedDateTime.from("2020-09-05T20:06:13+05:45[+05:45]"),
		)?.right?.toString(),
	).toEqual("2020-09-05T20:06:13+05:45[+05:45]")
})

test("[castToZonedDateTime] (utilities::castValue) returns Left(Array(Errors)) if uncastable", () => {
	expect(castToZonedDateTime("grizmo")).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					"Cannot cast grizmo to a zoned date-time: RangeError: Cannot parse: grizmo.",
				operation: "grizmo",
				type: "castToZonedDateTime",
			},
		],
	})
})
