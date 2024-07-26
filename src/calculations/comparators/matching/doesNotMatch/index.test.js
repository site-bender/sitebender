import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import DoesNotMatch from "../constructors/DoesNotMatch"
import doesNotMatch from "."

test("[doesNotMatch] (calculations::comparators::numerical) returns value when an integer", () => {
	expect(
		doesNotMatch(DoesNotMatch(Constant("String")("bob"))("Bob")(""))(),
	).toMatchObject({
		right: true,
	})
})

test("[doesNotMatch] (calculations::comparators::numerical) returns an error when not an integer", () => {
	expect(
		doesNotMatch(DoesNotMatch(Constant("String")("bob"))("Bob")("i"))(),
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
