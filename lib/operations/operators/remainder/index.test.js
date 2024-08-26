import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Remainder from "../constructors/Remainder"
import remainder from "./"

test("[remainder] (calculations::operators) works with two positives", async () => {
	const op = Remainder("Number")(Constant("Number")(7))(Constant("Number")(3))

	expect(await remainder(op)()).toMatchObject({ right: 1 })
})

test("[remainder] (calculations::operators) works with negative divisor", async () => {
	const op = Remainder("Number")(Constant("Number")(7))(Constant("Number")(-3))

	expect(await remainder(op)()).toMatchObject({ right: 1 })
})

test("[remainder] (calculations::operators) works with negative dividend", async () => {
	const op = Remainder("Number")(Constant("Number")(-7))(Constant("Number")(3))

	expect(await remainder(op)()).toMatchObject({ right: -1 })
})

test("[remainder] (calculations::operators) works with two negatives", async () => {
	const op = Remainder("Number")(Constant("Number")(-7))(Constant("Number")(-3))

	expect(await remainder(op)()).toMatchObject({ right: -1 })
})

test("[remainder] (calculations::operators) returns Left(Array(Errors)) on divide by zero", async () => {
	const op = Remainder("Number")(Constant("Number")(-7))(Constant("Number")(0))

	expect(await remainder(op)()).toMatchObject({
		left: [
			{
				right: -7,
			},
			{
				tag: "Error",
				message: "Cannot get remainder by zero.",
				operation: {
					tag: "Remainder",
					dividend: {
						tag: "Constant",
						datatype: "Number",
						value: -7,
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

test("[remainder] (calculations::operators) returns Left(Array(Errors)) on bad dividend", async () => {
	const op = Remainder("Number")(Constant("Number")())(Constant("Number")(-3))

	expect(await remainder(op)()).toMatchObject({
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
				right: -3,
			},
		],
	})
})

test("[remainder] (calculations::operators) returns Left(Array(Errors)) on bad divisor", async () => {
	const op = Remainder("Number")(Constant("Number")(-7))(Constant("Number")())

	expect(await remainder(op)()).toMatchObject({
		left: [
			{
				right: -7,
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
