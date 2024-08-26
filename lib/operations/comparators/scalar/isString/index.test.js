import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsString from "../constructors/IsString"
import isString from "."

test("[isString] (calculations::comparators::scalar) returns value when a number", async () => {
	expect(
		await isString(IsString(Constant("String")("slack!")))(),
	).toMatchObject({
		right: "slack!",
	})
})

test("[isString] (calculations::comparators::scalar) returns an error when not a number", async () => {
	expect(await isString(IsString(Constant("Boolean")(true)))()).toMatchObject({
		left: [
			{
				message: "true is not a string.",
				operation: {
					datatype: "String",
					operand: {
						datatype: "Boolean",
						tag: "Constant",
						value: true,
					},
					tag: "IsString",
				},
				tag: "Error",
				type: "IsString",
			},
		],
	})
})

test("[isString] (calculations::comparators::numerical) returns Left(Array(Errors)) when bad operand", async () => {
	expect(await isString(IsString(Constant("String")()))()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "String",
				},
				type: "Constant",
			},
		],
	})
})
