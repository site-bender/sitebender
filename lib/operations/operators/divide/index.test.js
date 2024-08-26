import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Divide from "../constructors/Divide"
import divide from "./"

test("[divide] (calculations::operators) returns Right(value)", async () => {
	const op = Divide("Number")(Constant()(12))(Constant()(2))

	expect(await divide(op)()).toMatchObject({ right: 6 })
})

test("[divide] (calculations::operators) returns Left(Array(Errors)) on divide by zero", async () => {
	const op = Divide("Number")(Constant()(12))(Constant()(0))

	expect(await divide(op)()).toMatchObject({
		left: [
			{
				right: 12,
			},
			{
				tag: "Error",
				message: "Cannot divide by zero.",
				operation: {
					tag: "Divide",
					dividend: {
						tag: "Constant",
						datatype: "Number",
						value: 12,
					},
					divisor: {
						tag: "Constant",
						datatype: "Number",
						value: 0,
					},
					datatype: "Number",
				},
				type: "Dividend",
			},
		],
	})
})

test("[divide] (calculations::operators) returns Left(Array(Errors)) on bad dividend", async () => {
	const op = Divide("Number")(Constant()())(Constant()(2))

	expect(await divide(op)()).toMatchObject({
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

test("[divide] (calculations::operators) returns Left(Array(Errors)) on bad divisor", async () => {
	const op = Divide("Number")(Constant()(12))(Constant()())

	expect(await divide(op)()).toMatchObject({
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
