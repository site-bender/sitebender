import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Ceiling from "../constructors/Ceiling"
import ceiling from "."

test("[ceiling] (operations::operators) gets the ceiling", async () => {
	const op = Ceiling("Number")(3)(Constant("Number")(0.12345))

	expect(await ceiling(op)()).toMatchObject({
		right: 0.124,
	})
})

test("[ceiling] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Ceiling("Number")(2)(Constant()())

	expect(await ceiling(op)(42)).toMatchObject({
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
