import { Temporal } from "temporal-polyfill"
import { expect, test } from "vitest"

import castToPlainDateTime from "./"

test("[castToPlainDateTime] (utilities::castValue) casts value to Right(PlainDateTime)", async () => {
	expect(castToPlainDateTime("2001-01-01T12:00:00")?.right?.toString()).toEqual(
		"2001-01-01T12:00:00",
	)
	expect(
		castToPlainDateTime(
			Temporal.PlainDateTime.from("2001-09-11T07:00:00"),
		)?.right?.toString(),
	).toEqual("2001-09-11T07:00:00")
})

test("[castToPlainDateTime] (utilities::castValue) returns Left(Array(Errors)) if uncastable", () => {
	expect(castToPlainDateTime("grizmo")).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					"Cannot cast grizmo to a plain date-time: RangeError: Cannot parse: grizmo.",
				operation: "grizmo",
				type: "castToPlainDateTime",
			},
		],
	})
})
