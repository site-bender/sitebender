import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Log from "../constructors/Log"
import log from "."

test("[log] (operations::operators) gets the log of 0", async () => {
	const op = Log("Number")(Constant("Number")(100))

	expect(await log(op)()).toMatchObject({ right: 2 })
})

test("[log] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Log("Number")(Constant()())

	expect(await log(op)()).toMatchObject({
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
