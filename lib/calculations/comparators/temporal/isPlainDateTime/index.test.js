import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsPlainDateTime from "../constructors/IsPlainDateTime"
import isPlainDateTime from "."

test("[isPlainDateTime] (calculations::comparators::scalar) returns value when a plain date-time", () => {
	expect(
		isPlainDateTime(
			IsPlainDateTime(Constant("PlainDateTime")("2001-01-01T00:00:01")),
		)(),
	).toMatchObject({
		right: "2001-01-01T00:00:01",
	})
})

test("[isPlainDateTime] (calculations::comparators::scalar) returns an error when not a plain date-time", () => {
	expect(
		isPlainDateTime(IsPlainDateTime(Constant("String")("Bob")))(),
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
