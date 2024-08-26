import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Negate from "../constructors/Negate"
import negate from "./"

test("[negate] (calculations::operators) works", async () => {
	expect(
		await negate(Negate("Number")(Constant("Number")(42)))(),
	).toMatchObject({ right: -42 })
})

test("[negate] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Negate("Number")(Constant()())

	expect(await negate(op)()).toMatchObject({
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
