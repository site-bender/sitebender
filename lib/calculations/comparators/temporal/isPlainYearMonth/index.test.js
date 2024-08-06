import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsPlainYearMonth from "../constructors/IsPlainYearMonth"
import isPlainYearMonth from "."

test("[isPlainYearMonth] (calculations::comparators::scalar) returns value when a plain year-month", async () => {
	expect(
		await isPlainYearMonth(
			IsPlainYearMonth(Constant("PlainYearMonth")("2001-01-01")),
		)(),
	).toMatchObject({
		right: "2001-01-01",
	})
})

test("[isPlainYearMonth] (calculations::comparators::scalar) returns an error when not a plain year-month", async () => {
	expect(
		await isPlainYearMonth(IsPlainYearMonth(Constant("String")("Bob")))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					"Bob is not a plain year-month: RangeError: Cannot parse: Bob.",
				operation: {
					tag: "IsPlainYearMonth",
					datatype: "PlainYearMonth",
					operand: { tag: "Constant", datatype: "String", value: "Bob" },
				},
				type: "IsPlainYearMonth",
			},
		],
	})
})
