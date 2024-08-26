import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Secant from "../constructors/Secant"
import secant from "."

test("[secant] (operations::operators) gets the secant", async () => {
	const op = Secant("Number")(Constant("Number")(Math.PI))

	expect(await secant(op)()).toMatchObject({ right: -1 })
})

test("[secant] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Secant("Number")(Constant()())

	expect(await secant(op)()).toMatchObject({
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
