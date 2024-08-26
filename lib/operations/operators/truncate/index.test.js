import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Truncate from "../constructors/Truncate"
import truncate from "./"

test("[truncate] (operations::operators) gets truncation of positive number", async () => {
	expect(
		await truncate(Truncate("Number")(2)(Constant("Number")(5.1234)))(),
	).toMatchObject({ right: 5.12 })
})

test("[truncate] (operations::operators) gets truncation of negative number", async () => {
	expect(
		await truncate(Truncate("Number")(3)(Constant("Number")(-5.1234)))(),
	).toMatchObject({ right: -5.123 })
})

test("[truncate] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Truncate("Number")(1)(Constant()())

	expect(await truncate(op)()).toMatchObject({
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
