import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Min from "../constructors/Min"
import min from "./"

test("[min] (operations::operators) returns Right(value)", async () => {
	const op = Min("Number")([Constant()(1), Constant()(2), Constant()(3)])

	expect(await min(op)()).toMatchObject({ right: 1 })
})

test("[min] (operations::operators) returns a left error if array empty", async () => {
	const op = Min("Number")([])

	expect(await min(op)()).toMatchObject({
		left: [
			{
				message: "Cannot get minimum of an empty list.",
				operation: {
					datatype: "Number",
					operands: [],
					tag: "Min",
				},
				tag: "Error",
				type: "Min",
			},
		],
	})
})

test("[min] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Min("Number")([Constant()(1), Constant()(), Constant()(3)])

	expect(await min(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Bad input to Min.",
				operation: {
					tag: "Min",
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
				type: "Min",
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
