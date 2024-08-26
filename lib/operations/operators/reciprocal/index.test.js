import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Reciprocal from "../constructors/Reciprocal"
import reciprocal from "./"

test("[reciprocal] (operations::operators) works", async () => {
	expect(
		await reciprocal(Reciprocal("Number")(Constant("Number")(1 / 42)))(),
	).toMatchObject({ right: 42 })
})

test("[reciprocal] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Reciprocal("Number")(Constant()())

	expect(await reciprocal(op)()).toMatchObject({
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
