import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Sine from "../constructors/Sine"
import sine from "."

test("[sine] (calculations::operators) gets the sine", async () => {
	const op = Sine("Number")(Constant("Number")(Math.PI / 2))

	expect(await sine(op)()).toMatchObject({ right: 1 })
})

test("[sine] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Sine("Number")(Constant()())

	expect(await sine(op)()).toMatchObject({
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
