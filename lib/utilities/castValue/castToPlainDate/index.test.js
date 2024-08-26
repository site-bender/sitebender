import { Temporal } from "temporal-polyfill"
import { expect, test } from "vitest"

import castToPlainDate from "./"

test("[castToPlainDate] (utilities::castValue) casts value to Right(PlainDate)", async () => {
	expect(castToPlainDate("2001-01-01")?.right?.toString()).toEqual("2001-01-01")
	expect(
		castToPlainDate(Temporal.PlainDate.from("2001-09-11"))?.right?.toString(),
	).toEqual("2001-09-11")
})

test("[castToPlainDate] (utilities::castValue) returns Left(Array(Errors)) if uncastable", () => {
	expect(castToPlainDate("grizmo")).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Cannot cast grizmo to a plain date: Cannot parse: grizmo.",
				operation: "grizmo",
				type: "castToPlainDate",
			},
		],
	})
})
