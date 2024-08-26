import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Cotangent from "../constructors/Cotangent"
import cotangent from "."

test("[cotangent] (calculations::operators) gets the cotangent", async () => {
	const op = Cotangent("Number")(Constant("Number")(0))

	expect(await cotangent(op)()).toMatchObject({ right: Infinity })
})

test("[cotangent] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Cotangent("Number")(Constant()())

	expect(await cotangent(op)()).toMatchObject({
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
