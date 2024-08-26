import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import DoesNotMatch from "../constructors/DoesNotMatch"
import doesNotMatch from "."

test("[doesNotMatch] (calculations::comparators::numerical) returns Right(value) when operand does not match test pattern", async () => {
	expect(
		await doesNotMatch(DoesNotMatch(Constant("String")("bob"))("Bob")(""))(),
	).toMatchObject({
		right: true,
	})
})

test("[doesNotMatch] (calculations::comparators::numerical) returns Left(Array(Errors)) when operand matches test pattern", async () => {
	expect(
		await doesNotMatch(DoesNotMatch(Constant("String")("bob"))("Bob")("i"))(),
	).toMatchObject({
		left: [
			{
				message: "bob matches /Bob/i.",
				operation: {
					datatype: "String",
					flags: "i",
					operand: {
						datatype: "String",
						tag: "Constant",
						value: "bob",
					},
					pattern: "Bob",
					tag: "DoesNotMatch",
				},
				tag: "Error",
				type: "DoesNotMatch",
			},
		],
	})
})

test("[doesNotMatch] (calculations::comparators::numerical) returns Left(Array(Errors)) when bad operand", async () => {
	expect(
		await doesNotMatch(DoesNotMatch(Constant("String")())("Bob")(""))(),
	).toMatchObject({
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

test("[doesNotMatch] (calculations::comparators::numerical) returns Left(Array(Errors)) when bad pattern", async () => {
	expect(
		await doesNotMatch(DoesNotMatch(Constant("String")("bob"))("([")(""))(),
	).toMatchObject({
		left: {
			tag: "Error",
			message:
				"Bad regular expression: SyntaxError: Invalid regular expression: /([/: Unterminated character class.",
			operation: {
				tag: "DoesNotMatch",
				datatype: "String",
				flags: "",
				operand: {
					tag: "Constant",
					datatype: "String",
					value: "bob",
				},
				pattern: "([",
			},
			type: "DoesNotMatch",
		},
	})
})
