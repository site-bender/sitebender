import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsPlainTime from "../constructors/IsPlainTime"
import isPlainTime from "."

test("[isPlainTime] (calculations::comparators::scalar) returns value when a plain time", async () => {
	expect(
		await isPlainTime(IsPlainTime(Constant("PlainTime")("00:00:01")))(),
	).toMatchObject({
		right: "00:00:01",
	})
})

test("[isPlainTime] (calculations::comparators::scalar) returns an error when not a plain time", async () => {
	expect(
		await isPlainTime(IsPlainTime(Constant("String")("Bob")))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Bob is not a plain time: RangeError: Cannot parse: Bob.",
				operation: {
					tag: "IsPlainTime",
					datatype: "PlainTime",
					operand: { tag: "Constant", datatype: "String", value: "Bob" },
				},
				type: "IsPlainTime",
			},
		],
	})
})
