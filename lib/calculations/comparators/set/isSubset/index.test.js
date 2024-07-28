import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsSubset from "../constructors/IsSubset"
import isSubset from "."

test("[isSubset] (calculations::comparators::numerical) returns value when sets are disjoint", () => {
	const op = IsSubset("Set")(Constant("Array")([2, 3]))(
		Constant("Array")([1, 2, 3, 4, 5, 6]),
	)

	expect(isSubset(op)()).toMatchObject({
		right: [2, 3],
	})
})

test("[isSubset] (calculations::comparators::numerical) returns an error when sets are not disjoint", () => {
	const op = IsSubset("Set")(Constant("Array")([1, 2, 3, 4]))(
		Constant("Array")([2, 3, 4, 5, 6]),
	)

	expect(isSubset(op)()).toMatchObject({
		left: [
			{
				message: "[1,2,3,4] is not a subset of [2,3,4,5,6]",
				operation: {
					datatype: "Set",
					operand: {
						datatype: "Array",
						tag: "Constant",
						value: [1, 2, 3, 4],
					},
					tag: "IsSubset",
					test: {
						datatype: "Array",
						tag: "Constant",
						value: [2, 3, 4, 5, 6],
					},
				},
				tag: "Error",
				type: "IsSubset",
			},
		],
	})
})

test("[isSubset] (calculations::comparators::numerical) returns an error when sets are invalid", () => {
	const op = IsSubset("Set")(Constant("Boolean")(true))(
		Constant("Array")([4, 5, 6]),
	)

	expect(isSubset(op)()).toMatchObject({
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
					tag: "IsSubset",
					test: {
						datatype: "Array",
						tag: "Constant",
						value: [4, 5, 6],
					},
				},
				tag: "Error",
				type: "IsSubset",
			},
		],
	})
})
