import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Add from "../constructors/Add"
import add from "./"

test("[add] (operations::operators) returns Right(value)", async () => {
	const op = Add("Number")([Constant()(1), Constant()(2), Constant()(3)])

	expect(await add(op)()).toMatchObject({ right: 6 })
})

test("[add] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Add("Number")([Constant()(1), Constant()(), Constant()(3)])

	expect(await add(op)()).toMatchObject({
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
