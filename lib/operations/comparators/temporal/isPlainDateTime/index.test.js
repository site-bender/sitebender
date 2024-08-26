import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsPlainDateTime from "../constructors/IsPlainDateTime"
import isPlainDateTimeTime from "."

test("[isPlainDateTimeTime] (calculations::comparators::scalar) returns value when a plain date-time", async () => {
	expect(
		await isPlainDateTimeTime(
			IsPlainDateTime(Constant("PlainDateTime")("2001-01-01T00:00:01")),
		)(),
	).toMatchObject({
		right: "2001-01-01T00:00:01",
	})
})

test("[isPlainDateTimeTime] (calculations::comparators::scalar) returns an error when not a plain date-time", async () => {
	expect(
		await isPlainDateTimeTime(IsPlainDateTime(Constant("String")("Bob")))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Bob is not a plain date-time: RangeError: Cannot parse: Bob.",
				operation: {
					tag: "IsPlainDateTime",
					datatype: "PlainDateTime",
					operand: { tag: "Constant", datatype: "String", value: "Bob" },
				},
				type: "IsPlainDateTime",
			},
		],
	})
})

test("[isPlainDateTime] (calculations::comparators::temporal) returns Left(Array(Errors)) when bad operand", async () => {
	expect(
		await isPlainDateTimeTime(IsPlainDateTime(Constant("PlainDateTime")()))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "PlainDateTime",
				},
				type: "Constant",
			},
		],
	})
})
