import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsMember from "../constructors/IsMember"
import isMember from "."

test("[isMember] (calculations::comparators::numerical) returns value when it is a member of the set (numbers)", () => {
	const op = IsMember("Member")(Constant("Integer")(5))(
		Constant("Integer")([4, 5, 6]),
	)

	expect(isMember(op)()).toMatchObject({
		right: 5,
	})
})

test("[isMember] (calculations::comparators::numerical) returns value when it is a member of the set (strings)", () => {
	const op = IsMember("Member")(Constant("String")("blue"))(
		Constant("String")(["red", "green", "blue"]),
	)

	expect(isMember(op)()).toMatchObject({
		right: "blue",
	})
})

test("[isMember] (calculations::comparators::numerical) returns an error when value is not a member of the set", () => {
	const op = IsMember("Member")(Constant("Integer")(2))(
		Constant("Integer")([4, 5, 6]),
	)

	expect(isMember(op)()).toMatchObject({
		left: [
			{
				message: "2 is not a member of [4,5,6]",
				operation: {
					datatype: "Member",
					operand: {
						datatype: "Integer",
						tag: "Constant",
						value: 2,
					},
					tag: "IsMember",
					test: {
						datatype: "Integer",
						tag: "Constant",
						value: [4, 5, 6],
					},
				},
				tag: "Error",
				type: "IsMember",
			},
		],
	})
})

test("[isMember] (calculations::comparators::numerical) returns an error when value is not a member of the set", () => {
	const op = IsMember("Member")(Constant("String")("cyan"))(
		Constant("String")(["red", "green", "blue"]),
	)

	expect(isMember(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: '"cyan" is not a member of ["red","green","blue"]',
				operation: {
					tag: "IsMember",
					datatype: "Member",
					operand: { tag: "Constant", datatype: "String", value: "cyan" },
					test: {
						tag: "Constant",
						datatype: "String",
						value: ["red", "green", "blue"],
					},
				},
				type: "IsMember",
			},
		],
	})
})

test("[isMember] (calculations::comparators::numerical) returns an error when the test set is not a set", () => {
	const op = IsMember("Member")(Constant("String")("cyan"))(
		Constant("Integer")(3),
	)

	expect(isMember(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					"Error creating set: TypeError: number 3 is not iterable (cannot read property Symbol(Symbol.iterator))",
				operation: {
					tag: "IsMember",
					datatype: "Member",
					operand: { tag: "Constant", datatype: "String", value: "cyan" },
					test: { tag: "Constant", datatype: "Integer", value: 3 },
				},
				type: "IsMember",
			},
		],
	})
})