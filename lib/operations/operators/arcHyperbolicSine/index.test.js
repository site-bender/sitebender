import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import ArcHyperbolicSine from "../constructors/ArcHyperbolicSine"
import arcHyperbolicSine from "."

test("[arcHyperbolicSine] (calculations::operators) gets the arcHyperbolicSine", async () => {
	const op = ArcHyperbolicSine("Number")(Constant("Number")(Math.PI))

	expect(await arcHyperbolicSine(op)()).toMatchObject({
		right: 1.8622957433108482,
	})
})

test("[arcHyperbolicSine] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = ArcHyperbolicSine("Number")(Constant()())

	expect(await arcHyperbolicSine(op)(42)).toMatchObject({
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
