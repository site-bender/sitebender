import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Hypotenuse from "../constructors/Hypotenuse"
import hypotenuse from "."

test("[hypotenuse] (operations::operators) returns hypotenuse for 3-4-5 right triangle", async () => {
	const op = Hypotenuse("Number")([
		Constant("Number")(4),
		Constant("Number")(3),
	])

	expect(await hypotenuse(op)()).toMatchObject({ right: 5 })
})

test("[hypotenuse] (operations::operators) returns hypotenuse for 5-12-13 right triangle", async () => {
	const op = Hypotenuse("Number")([
		Constant("Number")(5),
		Constant("Number")(12),
	])

	expect(await hypotenuse(op)()).toMatchObject({ right: 13 })
})

test("[hypotenuse] (operations::operators) returns hypotenuse for 3, 4, 5", async () => {
	const op = Hypotenuse("Number")([
		Constant("Number")(3),
		Constant("Number")(4),
		Constant("Number")(5),
	])

	expect(await hypotenuse(op)()).toMatchObject({ right: 7.0710678118654755 })
})

test("[hypotenuse] (operations::operators) returns hypotenuse for -5", async () => {
	const op = Hypotenuse("Number")([Constant("Number")(-5)])

	expect(await hypotenuse(op)()).toMatchObject({ right: 5 })
})

test("[hypotenuse] (operations::operators) returns Left(Array(Errors)) for empty array of operands", async () => {
	const op = Hypotenuse("Number")([])

	expect(await hypotenuse(op)()).toMatchObject({
		left: {
			tag: "Error",
			message: "Cannot take hypotenuse of an empty array.",
			operation: {
				tag: "Hypotenuse",
				operands: [],
				datatype: "Number",
			},
			type: "hypotenuse",
		},
	})
})

test("[hypotenuse] (operations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Hypotenuse("Number")([
		Constant("Number")(3),
		Constant("Number")(),
		Constant("Number")(5),
	])

	expect(await hypotenuse(op)()).toMatchObject({
		left: [
			{
				right: [3],
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
			{
				right: 5,
			},
		],
	})
})
