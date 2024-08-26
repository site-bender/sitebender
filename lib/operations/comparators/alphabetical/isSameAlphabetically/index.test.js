import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsSameAlphabetically from "../constructors/IsSameAlphabetically"
import isSameAlphabetically from "."

test("[isSameAlphabetically] (operations::comparators::alphabetical) returns Right(value) when true", async () => {
	const op = IsSameAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Bob"),
	)

	expect(await isSameAlphabetically(op)()).toMatchObject({ right: "Bob" })
})

test("[isSameAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when false", async () => {
	const op = IsSameAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Andy"),
	)

	expect(await isSameAlphabetically(op)()).toMatchObject({
		left: [
			{
				message: "Bob is not the same as Andy alphabetically.",
				operation: {
					datatype: "String",
					operand: {
						datatype: "String",
						tag: "Constant",
						value: "Bob",
					},
					tag: "IsSameAlphabetically",
					test: {
						datatype: "String",
						tag: "Constant",
						value: "Andy",
					},
				},
				tag: "Error",
				type: "IsSameAlphabetically",
			},
		],
	})
})

test("[isSameAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when operands fail", async () => {
	const op = IsSameAlphabetically()()(Constant("String")("Bob"))

	expect(await isSameAlphabetically(op)()).toMatchObject({
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
