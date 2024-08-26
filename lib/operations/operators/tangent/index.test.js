import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Tangent from "../constructors/Tangent"
import tangent from "."

test("[tangent] (calculations::operators) gets the tangent", async () => {
	const op = Tangent("Number")(Constant("Number")(0))

	expect(await tangent(op)()).toMatchObject({ right: 0 })
})

test("[tangent] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Tangent("Number")(Constant()())

	expect(await tangent(op)()).toMatchObject({
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
