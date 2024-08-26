import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Exponent from "../constructors/Exponent"
import exponent from "."

test("[exponent] (calculations::operators) gets the exponent of 1", async () => {
	const op = Exponent("Number")(Constant("Number")(1))

	expect(await exponent(op)()).toMatchObject({ right: 2.718281828459045 })
})

test("[exponent] (calculations::operators) gets the exponent of 0", async () => {
	const op = Exponent("Number")(Constant("Number")(0))

	expect(await exponent(op)()).toMatchObject({ right: 1 })
})

test("[exponent] (calculations::operators) gets the exponent of -1", async () => {
	const op = Exponent("Number")(Constant("Number")(-1))

	expect(await exponent(op)()).toMatchObject({ right: 0.36787944117144233 })
})

test("[exponent] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Exponent("Number")(Constant()())

	expect(await exponent(op)()).toMatchObject({
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
