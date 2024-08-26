import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsNotBeforeAlphabetically from "../constructors/IsNotBeforeAlphabetically"
import isNotBeforeAlphabetically from "./"

test("[isNotBeforeAlphabetically] (operations::comparators::alphabetical) returns Right(value) operand comes before test", async () => {
	const op = IsNotBeforeAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Andy"),
	)

	expect(await isNotBeforeAlphabetically(op)()).toMatchObject({ right: "Bob" })
})

test("[isNotBeforeAlphabetically] (operations::comparators::alphabetical) returns Right(value) when operand equals test", async () => {
	const op = IsNotBeforeAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Bob"),
	)

	expect(await isNotBeforeAlphabetically(op)()).toMatchObject({ right: "Bob" })
})

test("[isNotBeforeAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when operand comes after test", async () => {
	const op = IsNotBeforeAlphabetically()(Constant("String")("Bob"))(
		Constant("String")("Charlie"),
	)

	expect(await isNotBeforeAlphabetically(op)()).toMatchObject({
		left: [
			{
				message: "Bob is not after or equal to Charlie alphabetically.",
				operation: {
					datatype: "String",
					operand: {
						datatype: "String",
						tag: "Constant",
						value: "Bob",
					},
					tag: "IsNotBeforeAlphabetically",
					test: {
						datatype: "String",
						tag: "Constant",
						value: "Charlie",
					},
				},
				tag: "Error",
				type: "IsNotBeforeAlphabetically",
			},
		],
	})
})

test("[isNotBeforeAlphabetically] (operations::comparators::alphabetical) returns Left(Array(Errors)) when operands fail", async () => {
	const op = IsNotBeforeAlphabetically()()(Constant("String")("Bob"))

	expect(await isNotBeforeAlphabetically(op)()).toMatchObject({
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
