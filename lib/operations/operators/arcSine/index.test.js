import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import ArcSine from "../constructors/ArcSine"
import arcSine from "."

test("[arcSine] (calculations::operators) gets the arcSine", async () => {
	const op = ArcSine("Number")(Constant("Number")(0))

	expect(await arcSine(op)()).toMatchObject({
		right: 0,
	})
})

test("[arcSine] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = ArcSine("Number")(Constant()())

	expect(await arcSine(op)(42)).toMatchObject({
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
