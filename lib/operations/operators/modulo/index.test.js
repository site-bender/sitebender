import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Modulo from "../constructors/Modulo"
import modulo from "./"

test("[modulo] (calculations::operators) works with two positives", async () => {
	const op = Modulo("Number")(Constant("Number")(7))(Constant("Number")(3))

	expect(await modulo(op)()).toMatchObject({ right: 1 })
})

test("[modulo] (calculations::operators) works with negative divisor", async () => {
	const op = Modulo("Number")(Constant("Number")(7))(Constant("Number")(-3))

	expect(await modulo(op)()).toMatchObject({ right: -1 })
})

test("[modulo] (calculations::operators) works with negative dividend", async () => {
	const op = Modulo("Number")(Constant("Number")(-7))(Constant("Number")(3))

	expect(await modulo(op)()).toMatchObject({ right: 1 })
})

test("[modulo] (calculations::operators) works with two negatives", async () => {
	const op = Modulo("Number")(Constant("Number")(-7))(Constant("Number")(-3))

	expect(await modulo(op)()).toMatchObject({ right: -1 })
})

test("[modulo] (calculations::operators) returns Left(Array(Errors)) on zero divisor", async () => {
	const op = Modulo("Number")(Constant("Number")(-7))(Constant()(0))

	expect(await modulo(op)()).toMatchObject({
		left: [
			{
				right: -7,
			},
			{
				tag: "Error",
				message: "Cannot modulo by zero.",
				operation: {
					tag: "Modulo",
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

test("[modulo] (calculations::operators) returns Left(Array(Errors)) on bad dividend", async () => {
	const op = Modulo("Number")(Constant()())(Constant("Number")(-3))

	expect(await modulo(op)()).toMatchObject({
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

test("[modulo] (calculations::operators) returns Left(Array(Errors)) on bad divisor", async () => {
	const op = Modulo("Number")(Constant("Number")(-7))(Constant()())

	expect(await modulo(op)()).toMatchObject({
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
