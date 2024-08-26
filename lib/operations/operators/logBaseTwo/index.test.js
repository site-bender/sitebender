import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import LogBaseTwo from "../constructors/LogBaseTwo"
import logBaseTwo from "."

test("[logBaseTwo] (operations::operators) gets the logBaseTwo of 0", async () => {
	const op = LogBaseTwo("Number")(Constant("Number")(16))

	expect(await logBaseTwo(op)()).toMatchObject({ right: 4 })
})

test("[logBaseTwo] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = LogBaseTwo("Number")(Constant()())

	expect(await logBaseTwo(op)()).toMatchObject({
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
