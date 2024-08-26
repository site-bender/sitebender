import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Multiply from "../constructors/Multiply"
import multiply from "./"

test("[multiply] (operations::operators) returns Right(value)", async () => {
	const op = Multiply("Number")([Constant()(1), Constant()(2), Constant()(3)])

	expect(await multiply(op)()).toMatchObject({ right: 6 })
})

test("[multiply] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Multiply("Number")([Constant()(1), Constant()(), Constant()(3)])

	expect(await multiply(op)()).toMatchObject({
		left: [
			{
				right: 1,
			},
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Number",
				},
				type: "Constant",
			},
			{
				right: 3,
			},
		],
	})
})
