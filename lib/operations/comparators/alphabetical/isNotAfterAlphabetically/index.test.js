import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsNotAfterAlphabetically from "../constructors/IsNotAfterAlphabetically"
import isNotAfterAlphabetically from "./"

test("[isNotAfterAlphabetically] (operations::comparators::alphabetical) returns Right(value) operand comes before test", async () => {
	const op = IsNotAfterAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Charlie"),
	)

	expect(await isNotAfterAlphabetically(op)()).toMatchObject({ right: "Bob" })
})

test("[isNotAfterAlphabetically] (operations::comparators::alphabetical) returns Right(value) when operand equals test", async () => {
	const op = IsNotAfterAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Bob"),
	)

	expect(await isNotAfterAlphabetically(op)()).toMatchObject({ right: "Bob" })
})

test("[isNotAfterAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when operand comes after test", async () => {
	const op = IsNotAfterAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Andy"),
	)

	expect(await isNotAfterAlphabetically(op)()).toMatchObject({
		left: [
			{
				message: "Bob is not before or equal to Andy alphabetically.",
				operation: {
					datatype: "String",
					operand: {
						datatype: "String",
						tag: "Constant",
						value: "Bob",
					},
					tag: "IsNotAfterAlphabetically",
					test: {
						datatype: "String",
						tag: "Constant",
						value: "Andy",
					},
				},
				tag: "Error",
				type: "IsNotAfterAlphabetically",
			},
		],
	})
})

test("[isNotAfterAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when operands fail", async () => {
	const op = IsNotAfterAlphabetically()()(Constant("String")("Bob"))

	expect(await isNotAfterAlphabetically(op)()).toMatchObject({
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
