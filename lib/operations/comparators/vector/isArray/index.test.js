import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsArray from "../constructors/IsArray"
import isArray from "."

test("[isArray] (calculations::comparators::scalar) returns value when a boolean", async () => {
	expect(
		await isArray(IsArray(Constant("Array")(["red", "green", "blue"])))(),
	).toMatchObject({
		right: ["red", "green", "blue"],
	})
})

test("[isArray] (calculations::comparators::scalar) returns an error when not a boolean", async () => {
	expect(await isArray(IsArray(Constant("Number")(66.6)))()).toMatchObject({
		left: [
			{
				message: "66.6 is not an array.",
				operation: {
					datatype: "Array",
					operand: {
						datatype: "Number",
						tag: "Constant",
						value: 66.6,
					},
					tag: "IsArray",
				},
				tag: "Error",
				type: "IsArray",
			},
		],
	})
})
