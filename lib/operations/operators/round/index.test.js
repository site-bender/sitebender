import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Round from "../constructors/Round"
import round from "./"

test("[round] (operations::operators) works", async () => {
	expect(
		await round(Round("Number")(2)(Constant("Number")(5.1234)))(),
	).toMatchObject({ right: 5.12 })
})

test("[round] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Round("Number")(1)(Constant()())

	expect(await round(op)()).toMatchObject({
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
