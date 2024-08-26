import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Mode from "../constructors/Mode"
import mode from "."

test("[mode] (calculations::operators) gets mode from a set of numbers", async () => {
	const op = Mode("Number")([
		Constant("Number")(5),
		Constant("Number")(7),
		Constant("Number")(5),
		Constant("Number")(13),
		Constant("Number")(9),
		Constant("Number")(7),
		Constant("Number")(13),
		Constant("Number")(7),
	])

	expect(await mode(op)()).toMatchObject({ right: 7 })
})

test("[mode] (calculations::operators) gets mode from a set of strings", async () => {
	const op = Mode("String")([
		Constant("String")("Bob"),
		Constant("String")("is"),
		Constant("String")("the"),
		Constant("String")("Bob"),
		Constant("String")("beyond"),
		Constant("String")("Bob"),
	])

	expect(await mode(op)()).toMatchObject({ right: "Bob" })
})

test("[mode] (calculations::operators) gets mode from a set of booleans", async () => {
	const op = Mode("Boolean")([
		Constant("Boolean")(true),
		Constant("Boolean")(false),
		Constant("Boolean")(false),
		Constant("Boolean")(true),
		Constant("Boolean")(false),
		Constant("Boolean")(true),
		Constant("Boolean")(false),
	])

	expect(await mode(op)()).toMatchObject({ right: false })
})

test("[mode] (calculations::operators) returns a left error if array empty", async () => {
	const op = Mode("Number")([])

	expect(await mode(op)()).toMatchObject({
		left: {
			message: "Cannot take mode of empty array.",
			operation: {
				datatype: "Number",
				operands: [],
				tag: "Mode",
			},
			tag: "Error",
			type: "mode",
		},
	})
})

test("[mode] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = Mode("String")([
		Constant("String")("Bob"),
		Constant("String")("is"),
		Constant("String")(),
		Constant("String")("Bob"),
	])

	expect(await mode(op)()).toMatchObject({
		left: [
			{
				right: ["Bob", "is"],
			},
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "String",
				},
				type: "Constant",
			},
			{
				right: "Bob",
			},
		],
	})
})
