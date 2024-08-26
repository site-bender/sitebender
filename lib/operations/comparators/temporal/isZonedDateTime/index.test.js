import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsZonedDateTime from "../constructors/IsZonedDateTime"
import isZonedDateTime from "."

test("[isZonedDateTime] (calculations::comparators::scalar) returns value when a zoned date-time", async () => {
	expect(
		await isZonedDateTime(
			IsZonedDateTime(
				Constant("ZonedDateTime")("2022-01-28T19:53+01:00[Europe/Berlin]"),
			),
		)(),
	).toMatchObject({
		right: "2022-01-28T19:53+01:00[Europe/Berlin]",
	})
})

test("[isZonedDateTime] (calculations::comparators::scalar) returns an error when not a zoned date-time", async () => {
	expect(
		await isZonedDateTime(IsZonedDateTime(Constant("String")("Bob")))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Bob is not a zoned date-time: RangeError: Cannot parse: Bob",
				operation: {
					tag: "IsZonedDateTime",
					datatype: "ZonedDateTime",
					operand: { tag: "Constant", datatype: "String", value: "Bob" },
				},
				type: "IsZonedDateTime",
			},
		],
	})
})

test("[isZonedDateTime] (calculations::comparators::temporal) returns Left(Array(Errors)) when bad operand", async () => {
	expect(
		await isZonedDateTime(IsZonedDateTime(Constant("ZonedDateTime")()))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "ZonedDateTime",
				},
				type: "Constant",
			},
		],
	})
})
