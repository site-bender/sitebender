import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import ArcHyperbolicTangent from "../constructors/ArcHyperbolicTangent"
import arcHyperbolicTangent from "."

test("[arcHyperbolicTangent] (calculations::operators) gets the arcHyperbolicTangent", async () => {
	const op = ArcHyperbolicTangent("Number")(Constant("Number")(0))

	expect(await arcHyperbolicTangent(op)()).toMatchObject({
		right: 0,
	})
})

test("[arcHyperbolicTangent] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = ArcHyperbolicTangent("Number")(Constant()())

	expect(await arcHyperbolicTangent(op)(42)).toMatchObject({
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
