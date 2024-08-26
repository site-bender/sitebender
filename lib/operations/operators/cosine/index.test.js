import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Cosine from "../constructors/Cosine"
import cosine from "."

test("[cosine] (calculations::operators) gets the cosine", async () => {
	const op = Cosine("Number")(Constant("Number")(Math.PI))

	expect(await cosine(op)()).toMatchObject({ right: -1 })
})

test("[cosine] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Cosine("Number")(Constant()())

	expect(await cosine(op)()).toMatchObject({
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
