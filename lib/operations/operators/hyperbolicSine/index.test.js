import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import HyperbolicSine from "../constructors/HyperbolicSine"
import hyperbolicSine from "."

test("[hyperbolicSine] (operations::operators) gets the hyperbolicSine", async () => {
	const op = HyperbolicSine("Number")(Constant("Number")(-1))

	expect(await hyperbolicSine(op)()).toMatchObject({
		right: -1.1752011936438014,
	})
})

test("[hyperbolicSine] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = HyperbolicSine("Number")(Constant()())

	expect(await hyperbolicSine(op)()).toMatchObject({
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
