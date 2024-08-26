import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import HyperbolicCosine from "../constructors/HyperbolicCosine"
import hyperbolicCosine from "."

test("[hyperbolicCosine] (operations::operators) gets the hyperbolicCosine", async () => {
	const op = HyperbolicCosine("Number")(Constant("Number")(-1))

	expect(await hyperbolicCosine(op)()).toMatchObject({
		right: 1.5430806348152437,
	})
})

test("[hyperbolicCosine] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = HyperbolicCosine("Number")(Constant()())

	expect(await hyperbolicCosine(op)()).toMatchObject({
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
