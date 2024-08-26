import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import Matches from "../constructors/Matches"
import matches from "."

test("[matches] (calculations::comparators::numerical) returns value when an integer", async () => {
	expect(
		await matches(Matches(Constant("String")("bob"))("Bob")("i"))(),
	).toMatchObject({
		right: true,
	})
})

test("[matches] (calculations::comparators::numerical) returns an error when not an integer", async () => {
	expect(
		await matches(Matches(Constant("String")("bob"))("Bob")(""))(),
	).toMatchObject({
		left: [
			{
				message: "bob does not match /Bob/.",
				operation: {
					datatype: "String",
					flags: "",
					operand: {
						datatype: "String",
						tag: "Constant",
						value: "bob",
					},
					pattern: "Bob",
					tag: "Matches",
				},
				tag: "Error",
				type: "Matches",
			},
		],
	})
})

test("[matches] (calculations::comparators::numerical) returns Left(Array(Errors)) when bad operand", async () => {
	expect(
		await matches(Matches(Constant("String")())("Bob")(""))(),
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

test("[matches] (calculations::comparators::numerical) returns Left(Array(Errors)) when bad pattern", async () => {
	expect(
		await matches(Matches(Constant("String")("bob"))("([")(""))(),
	).toMatchObject({
		left: {
			tag: "Error",
			message:
				"Bad regular expression: SyntaxError: Invalid regular expression: /([/: Unterminated character class.",
			operation: {
				tag: "Matches",
				datatype: "String",
				flags: "",
				operand: {
					tag: "Constant",
					datatype: "String",
					value: "bob",
				},
				pattern: "([",
			},
			type: "Matches",
		},
	})
})
