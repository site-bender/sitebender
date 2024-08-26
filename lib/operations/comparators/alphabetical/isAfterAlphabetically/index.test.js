import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsAfterAlphabetically from "../constructors/IsAfterAlphabetically"
import isAfterAlphabetically from "./"

test("[isAfterAlphabetically] (operations::comparators::alphabetical) returns Right(value) when true", async () => {
	const op = IsAfterAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Andy"),
	)

	expect(await isAfterAlphabetically(op)()).toMatchObject({ right: "Bob" })
})

test("[isAfterAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when false", async () => {
	const op = IsAfterAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Bob"),
	)

	expect(await isAfterAlphabetically(op)()).toMatchObject({
		left: [
			{
				message: "Bob is not after Bob alphabetically.",
				operation: {
					datatype: "String",
					operand: {
						datatype: "String",
						tag: "Constant",
						value: "Bob",
					},
					tag: "IsAfterAlphabetically",
					test: {
						datatype: "String",
						tag: "Constant",
						value: "Bob",
					},
				},
				tag: "Error",
				type: "IsAfterAlphabetically",
			},
		],
	})
})

test("[isAfterAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when operands fail", async () => {
	const op = IsAfterAlphabetically()()(Constant("String")("Bob"))

	expect(await isAfterAlphabetically(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Operation undefined or malformed: undefined.",
				type: "Comparison",
			},
			{
				right: "Bob",
			},
		],
	})
})
