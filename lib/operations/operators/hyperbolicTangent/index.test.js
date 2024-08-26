import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import HyperbolicTangent from "../constructors/HyperbolicTangent"
import hyperbolicTangent from "."

test("[hyperbolicTangent] (calculations::operators) gets the hyperbolicTangent", async () => {
	const op = HyperbolicTangent("Number")(Constant("Number")(-1))

	expect(await hyperbolicTangent(op)()).toMatchObject({
		right: -0.7615941559557649,
	})
})

test("[hyperbolicTangent] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = HyperbolicTangent("Number")(Constant()())

	expect(await hyperbolicTangent(op)()).toMatchObject({
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
