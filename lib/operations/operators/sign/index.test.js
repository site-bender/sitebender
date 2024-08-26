import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Sign from "../constructors/Sign"
import sign from "./"

test("[sign] (calculations::operators) works", async () => {
	expect(await sign(Sign("Number")(Constant("Number")(-42)))()).toMatchObject({
		right: -1,
	})
})

test("[sign] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Sign("Number")(Constant()())

	expect(await sign(op)()).toMatchObject({
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
