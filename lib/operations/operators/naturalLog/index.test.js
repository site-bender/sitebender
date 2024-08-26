import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import NaturalLog from "../constructors/NaturalLog"
import naturalLog from "."

test("[naturalLog] (calculations::operators) gets the naturalLog of 0", async () => {
	const op = NaturalLog("Number")(Constant("Number")(Math.E * Math.E))

	expect(await naturalLog(op)()).toMatchObject({ right: 2 })
})

test("[naturalLog] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = NaturalLog("Number")(Constant()())

	expect(await naturalLog(op)()).toMatchObject({
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
