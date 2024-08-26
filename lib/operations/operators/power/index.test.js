import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Power from "../constructors/Power"
import power from "./"

test("[power] (operations::operators) returns Right(value)", async () => {
	const op = Power("Number")(Constant()(12))(Constant()(2))

	expect(await power(op)()).toMatchObject({ right: 144 })
})

test("[power] (operations::operators) returns Left(Array(Errors)) on bad base", async () => {
	const op = Power("Number")(Constant()())(Constant()(2))

	expect(await power(op)()).toMatchObject({
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

test("[power] (operations::operators) returns Left(Array(Errors)) on bad exponent", async () => {
	const op = Power("Number")(Constant()(12))(Constant()())

	expect(await power(op)()).toMatchObject({
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
