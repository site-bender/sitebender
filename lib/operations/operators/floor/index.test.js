import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Floor from "../constructors/Floor"
import floor from "./"

test("[floor] (calculations::operators) gets floor of positive number", async () => {
	expect(
		await floor(Floor("Number")(2)(Constant("Number")(5.1234)))(),
	).toMatchObject({ right: 5.12 })
})

test("[floor] (calculations::operators) gets floor of negative number", async () => {
	expect(
		await floor(Floor("Number")(3)(Constant("Number")(-5.1234)))(),
	).toMatchObject({ right: -5.124 })
})

test("[floor] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Floor("Number")(1)(Constant()())

	expect(await floor(op)()).toMatchObject({
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
