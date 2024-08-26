import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Subtract from "../constructors/Subtract"
import subtract from "./"

test("[subtract] (calculations::operators) returns Right(value)", async () => {
	const op = Subtract("Number")(Constant()(12))(Constant()(7))

	expect(await subtract(op)()).toMatchObject({ right: 5 })
})

test("[subtract] (calculations::operators) returns Left(Array(Errors)) on bad minuend", async () => {
	const op = Subtract("Number")(Constant()())(Constant()(2))

	expect(await subtract(op)()).toMatchObject({
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
			{
				right: 2,
			},
		],
	})
})

test("[subtract] (calculations::operators) returns Left(Array(Errors)) on bad subtrahend", async () => {
	const op = Subtract("Number")(Constant()(12))(Constant()())

	expect(await subtract(op)()).toMatchObject({
		left: [
			{
				right: 12,
			},
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
