import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsPlainMonthDay from "../constructors/IsPlainMonthDay"
import isPlainMonthDay from "."

test("[isPlainMonthDay] (calculations::comparators::scalar) returns value when a plain month-day", async () => {
	expect(
		await isPlainMonthDay(
			IsPlainMonthDay(Constant("PlainMonthDay")("2001-01-01")),
		)(),
	).toMatchObject({
		right: "2001-01-01",
	})
})

test("[isPlainMonthDay] (calculations::comparators::scalar) returns an error when not a plain month-day", async () => {
	expect(
		await isPlainMonthDay(IsPlainMonthDay(Constant("String")("Bob")))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Bob is not a plain month-day: RangeError: Cannot parse: Bob",
				operation: {
					tag: "IsPlainMonthDay",
					datatype: "PlainMonthDay",
					operand: { tag: "Constant", datatype: "String", value: "Bob" },
				},
				type: "IsPlainMonthDay",
			},
		],
	})
})
