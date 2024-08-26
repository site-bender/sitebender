import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Max from "../constructors/Max"
import max from "."

test("[max] (calculations::operators) gets max from a list of values", async () => {
	const op = Max("Number")([
		Constant("Number")(7),
		Constant("Number")(5),
		Constant("Number")(13),
		Constant("Number")(9),
		Constant("Number")(11),
	])

	expect(await max(op)()).toMatchObject({ right: 13 })
})

test("[max] (calculations::operators) returns a left error if array empty", async () => {
	const op = Max("Number")([])

	expect(await max(op)()).toMatchObject({
		left: [
			{
				message: "Cannot get maximum of an empty list.",
				operation: {
					datatype: "Number",
					operands: [],
					tag: "Max",
				},
				tag: "Error",
				type: "Max",
			},
		],
	})
})

test("[max] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Max("Number")([Constant()(1), Constant()(), Constant()(3)])

	expect(await max(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Bad input to Max.",
				operation: {
					tag: "Max",
					operands: [
						{
							tag: "Constant",
							datatype: "Number",
							value: 1,
						},
						{
							tag: "Constant",
							datatype: "Number",
						},
						{
							tag: "Constant",
							datatype: "Number",
							value: 3,
						},
					],
					datatype: "Number",
				},
				type: "Max",
			},
			{
				right: 1,
			},
			{
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
			},
			{
				right: 3,
			},
		],
	})
})
