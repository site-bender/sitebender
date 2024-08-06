import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import RootMeanSquare from "../constructors/RootMeanSquare"
import rootMeanSquare from "."

test("[rootMeanSquare] (calculations::operators) gets rootMeanSquare from an array of values", async () => {
	const op = RootMeanSquare("Number")([
		Constant("Number")(7),
		Constant("Number")(5),
		Constant("Number")(13),
		Constant("Number")(9),
		Constant("Number")(11),
	])

	expect(await rootMeanSquare(op)()).toMatchObject({
		right: 21.095023109728988,
	})
})

test("[rootMeanSquare] (calculations::operators) returns a left error if array empty", async () => {
	const op = RootMeanSquare("Number")([])

	expect(await rootMeanSquare(op)()).toMatchObject({
		left: {
			message: "Cannot take root mean square of an empty array.",
			operation: {
				datatype: "Number",
				operands: [],
				tag: "RootMeanSquare",
			},
			tag: "Error",
			type: "rootMeanSquare",
		},
	})
})
