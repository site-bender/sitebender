import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsBoolean from "../constructors/IsBoolean"
import isBoolean from "."

test("[isBoolean] (calculations::comparators::scalar) returns value when a boolean", async () => {
	expect(
		await isBoolean(IsBoolean(Constant("Boolean")(false)))(),
	).toMatchObject({
		right: false,
	})
})

test("[isBoolean] (calculations::comparators::scalar) returns an error when not a boolean", async () => {
	expect(await isBoolean(IsBoolean(Constant("Number")(66.6)))()).toMatchObject({
		left: [
			{
				message: "66.6 is not a boolean value (true/false).",
				operation: {
					datatype: "Boolean",
					operand: {
						datatype: "Number",
						tag: "Constant",
						value: 66.6,
					},
					tag: "IsBoolean",
				},
				tag: "Error",
				type: "IsBoolean",
			},
		],
	})
})

test("[isBoolean] (calculations::comparators::numerical) returns Left(Array(Errors)) when bad operand", async () => {
	expect(await isBoolean(IsBoolean(Constant("Boolean")()))()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Boolean",
				},
				type: "Constant",
			},
		],
	})
})
