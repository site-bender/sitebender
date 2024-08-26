import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsTimeZone from "../constructors/IsTimeZone"
import isTimeZone from "."

test("[isTimeZone] (calculations::comparators::scalar) returns value when a plain date-time", async () => {
	expect(
		await isTimeZone(IsTimeZone(Constant("TimeZone")("UTC")))(),
	).toMatchObject({
		right: "UTC",
	})
})

test("[isTimeZone] (calculations::comparators::scalar) returns an error when not a plain date-time", async () => {
	expect(
		await isTimeZone(IsTimeZone(Constant("String")("Bob")))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					"Bob is not a time zone: RangeError: Invalid time zone specified: BOB.",
				operation: {
					tag: "IsTimeZone",
					datatype: "TimeZone",
					operand: { tag: "Constant", datatype: "String", value: "Bob" },
				},
				type: "IsTimeZone",
			},
		],
	})
})

test("[isTimeZone] (calculations::comparators::temporal) returns Left(Array(Errors)) when bad operand", async () => {
	expect(await isTimeZone(IsTimeZone(Constant("TimeZone")()))()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "TimeZone",
				},
				type: "Constant",
			},
		],
	})
})
