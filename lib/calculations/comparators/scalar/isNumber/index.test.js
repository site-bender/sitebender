import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsNumber from "../constructors/IsNumber"
import isNumber from "."

test("[isNumber] (calculations::comparators::scalar) returns value when a number", () => {
	expect(isNumber(IsNumber(Constant("Number")(77.7)))()).toMatchObject({
		right: 77.7,
	})
})

test("[isNumber] (calculations::comparators::scalar) returns an error when not a number", () => {
	expect(isNumber(IsNumber(Constant("Boolean")(true)))()).toMatchObject({
		left: [
			{
				message: "true is not a number.",
				operation: {
					datatype: "Number",
					operand: {
						datatype: "Boolean",
						tag: "Constant",
						value: true,
					},
					tag: "IsNumber",
				},
				tag: "Error",
				type: "IsNumber",
			},
		],
	})
})
