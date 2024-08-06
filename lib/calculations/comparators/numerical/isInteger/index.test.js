import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsInteger from "../constructors/IsInteger"
import isInteger from "."

test("[isInteger] (calculations::comparators::numerical) returns value when an integer", async () => {
	expect(await isInteger(IsInteger(Constant("Integer")(77)))()).toMatchObject({
		right: 77,
	})
})

test("[isInteger] (calculations::comparators::numerical) returns an error when not an integer", async () => {
	expect(await isInteger(IsInteger(Constant("Number")(66.6)))()).toMatchObject({
		left: [
			{
				message: "66.6 is not an integer.",
				operation: {
					datatype: "Integer",
					operand: {
						datatype: "Number",
						tag: "Constant",
						value: 66.6,
					},
					tag: "IsInteger",
				},
				tag: "Error",
				type: "IsInteger",
			},
		],
	})
})
