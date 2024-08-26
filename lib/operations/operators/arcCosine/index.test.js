import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import ArcCosine from "../constructors/ArcCosine"
import arcCosine from "."

test("[arcCosine] (operations::operators) gets the arcCosine of 1", async () => {
	const op = ArcCosine("Number")(Constant("Number")(1))

	expect(await arcCosine(op)()).toMatchObject({ right: 0 })
})

test("[arcCosine] (operations::operators) gets the arcCosine of o", async () => {
	const op = ArcCosine("Number")(Constant("Number")(0))

	expect(await arcCosine(op)()).toMatchObject({ right: Math.PI / 2 })
})

test("[arcCosine] (operations::operators) gets the arcCosine of -1", async () => {
	const op = ArcCosine("Number")(Constant("Number")(-1))

	expect(await arcCosine(op)()).toMatchObject({ right: Math.PI })
})

test("[arcCosine] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = ArcCosine("Number")(Constant()())

	expect(await arcCosine(op)(42)).toMatchObject({
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
