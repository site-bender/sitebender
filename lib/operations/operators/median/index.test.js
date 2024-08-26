import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Median from "../constructors/Median"
import median from "."

test("[median] (calculations::operators) gets median from an odd number of values", async () => {
	const op = Median("Number")([
		Constant("Number")(7),
		Constant("Number")(5),
		Constant("Number")(13),
		Constant("Number")(9),
		Constant("Number")(11),
	])

	expect(await median(op)()).toMatchObject({ right: 9 })
})

test("[median] (calculations::operators) gets median from an even number of values", async () => {
	const op = Median("Number")([
		Constant("Number")(7),
		Constant("Number")(5),
		Constant("Number")(13),
		Constant("Number")(9),
		Constant("Number")(11),
		Constant("Number")(3),
	])

	expect(await median(op)()).toMatchObject({ right: 8 })
})

test("[median] (calculations::operators) returns a left error if array empty", async () => {
	const op = Median("Number")([])

	expect(await median(op)()).toMatchObject({
		left: [
			{
				message: "Cannot take median of an empty array.",
				operation: {
					datatype: "Number",
					operands: [],
					tag: "Median",
				},
				tag: "Error",
				type: "Median",
			},
		],
	})
})

test("[median] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Median("Number")([
		Constant("Number")(13),
		Constant("Number")(),
		Constant("Number")(11),
	])

	expect(await median(op)()).toMatchObject({
		left: [
			{
				right: [13],
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
				right: 11,
			},
		],
	})
})
