import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import ArcTangent from "../constructors/ArcTangent"
import arcTangent from "."

test("[arcTangent] (operations::operators) gets the arcTangent", async () => {
	const op = ArcTangent("Number")(Constant("Number")(0))

	expect(await arcTangent(op)()).toMatchObject({
		right: 0,
	})
})

test("[arcTangent] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = ArcTangent("Number")(Constant()())

	expect(await arcTangent(op)(42)).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Number",
				},
				type: "Constant",
			},
		],
	})
})
