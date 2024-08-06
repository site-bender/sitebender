import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsPlainDate from "../constructors/IsPlainDate"
import isPlainDate from "."

test("[isPlainDate] (calculations::comparators::scalar) returns value when a plain date", async () => {
	expect(
		await isPlainDate(IsPlainDate(Constant("PlainDate")("2001-01-01")))(),
	).toMatchObject({
		right: "2001-01-01",
	})
})

test("[isPlainDate] (calculations::comparators::scalar) returns an error when not a plain date", async () => {
	expect(
		await isPlainDate(IsPlainDate(Constant("String")("Bob")))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Bob is not a plain date: RangeError: Cannot parse: Bob.",
				operation: {
					tag: "IsPlainDate",
					datatype: "PlainDate",
					operand: { tag: "Constant", datatype: "String", value: "Bob" },
				},
				type: "IsPlainDate",
			},
		],
	})
})
