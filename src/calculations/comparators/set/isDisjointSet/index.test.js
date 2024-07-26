import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsDisjointSet from "../constructors/IsDisjointSet"
import isDisjointSet from "."

test("[isDisjointSet] (calculations::comparators::numerical) returns value when sets are disjoint", () => {
	const op = IsDisjointSet("Set")(Constant("Integer")([1, 2, 3]))(
		Constant("Integer")([4, 5, 6]),
	)

	expect(isDisjointSet(op)()).toMatchObject({
		right: [1, 2, 3],
	})
})

test("[isDisjointSet] (calculations::comparators::numerical) returns an error when sets are not disjoint", () => {
	const op = IsDisjointSet("Set")(Constant("Integer")([1, 2, 3, 4]))(
		Constant("Integer")([4, 5, 6]),
	)

	expect(isDisjointSet(op)()).toMatchObject({
		left: [
			{
				message: "[1,2,3,4] is not disjoint from [4,5,6]",
				operation: {
					datatype: "Set",
					operand: {
						datatype: "Integer",
						tag: "Constant",
						value: [1, 2, 3, 4],
					},
					tag: "IsDisjointSet",
					test: {
						datatype: "Integer",
						tag: "Constant",
						value: [4, 5, 6],
					},
				},
				tag: "Error",
				type: "IsDisjointSet",
			},
		],
	})
})

test("[isDisjointSet] (calculations::comparators::numerical) returns an error when sets are invalid", () => {
	const op = IsDisjointSet("Set")(Constant("Boolean")(true))(
		Constant("Integer")([4, 5, 6]),
	)

	expect(isDisjointSet(op)()).toMatchObject({
		left: [
			{
				message:
					"Error creating sets: TypeError: boolean true is not iterable (cannot read property Symbol(Symbol.iterator))",
				operation: {
					datatype: "Set",
					operand: {
						datatype: "Boolean",
						tag: "Constant",
						value: true,
					},
					tag: "IsDisjointSet",
					test: {
						datatype: "Integer",
						tag: "Constant",
						value: [4, 5, 6],
					},
				},
				tag: "Error",
				type: "IsDisjointSet",
			},
		],
	})
})
