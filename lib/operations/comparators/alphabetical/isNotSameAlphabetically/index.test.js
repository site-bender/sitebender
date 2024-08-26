import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsNotSameAlphabetically from "../constructors/IsNotSameAlphabetically"
import isNotSameAlphabetically from "./"

test("[isNotSameAlphabetically] (operations::comparators::alphabetical) returns Right(value) when true", async () => {
	const op = IsNotSameAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Andy"),
	)

	expect(await isNotSameAlphabetically(op)()).toMatchObject({ right: "Bob" })
})

test("[isNotSameAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when false", async () => {
	const op = IsNotSameAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Bob"),
	)

	expect(await isNotSameAlphabetically(op)()).toMatchObject({
		left: [
			{
				message: "Bob is the same as Bob alphabetically.",
				operation: {
					datatype: "String",
					operand: {
						datatype: "String",
						tag: "Constant",
						value: "Bob",
					},
					tag: "IsNotSameAlphabetically",
					test: {
						datatype: "String",
						tag: "Constant",
						value: "Bob",
					},
				},
				tag: "Error",
				type: "IsNotSameAlphabetically",
			},
		],
	})
})

test("[isNotSameAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when operands fail", async () => {
	const op = IsNotSameAlphabetically()()(Constant("String")("Bob"))

	expect(await isNotSameAlphabetically(op)()).toMatchObject({
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
