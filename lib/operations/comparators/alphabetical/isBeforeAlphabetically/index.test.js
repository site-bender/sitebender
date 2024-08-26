import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsBeforeAlphabetically from "../constructors/IsBeforeAlphabetically"
import isBeforeAlphabetically from "./"

test("[isBeforeAlphabetically] (operations::comparators::alphabetical) returns Right(value) when true", async () => {
	const op = IsBeforeAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Charlie"),
	)

	expect(await isBeforeAlphabetically(op)()).toMatchObject({ right: "Bob" })
})

test("[isBeforeAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when false", async () => {
	const op = IsBeforeAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Bob"),
	)

	expect(await isBeforeAlphabetically(op)()).toMatchObject({
		left: [
			{
				message: "Bob is not before Bob alphabetically.",
				operation: {
					datatype: "String",
					operand: {
						datatype: "String",
						tag: "Constant",
						value: "Bob",
					},
					tag: "IsBeforeAlphabetically",
					test: {
						datatype: "String",
						tag: "Constant",
						value: "Bob",
					},
				},
				tag: "Error",
				type: "IsBeforeAlphabetically",
			},
		],
	})
})

test("[isBeforeAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when operands fail", async () => {
	const op = IsBeforeAlphabetically()()(Constant("String")("Bob"))

	expect(await isBeforeAlphabetically(op)()).toMatchObject({
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
