import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import ArcHyperbolicCosine from "../constructors/ArcHyperbolicCosine"
import arcHyperbolicCosine from "."

test("[arcHyperbolicCosine] (operations::operators) gets the arcHyperbolicCosine", async () => {
	const op = ArcHyperbolicCosine("Number")(Constant("Number")(Math.PI))

	expect(await arcHyperbolicCosine(op)()).toMatchObject({
		right: 1.811526272460853,
	})
})

test("[arcHyperbolicCosine] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = ArcHyperbolicCosine("Number")(Constant()())

	expect(await arcHyperbolicCosine(op)(42)).toMatchObject({
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
