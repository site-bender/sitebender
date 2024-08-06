import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsDisjointSet from "../constructors/IsDisjointSet"
import isDisjointSet from "."

test("[isDisjointSet] (calculations::comparators::numerical) returns value when sets are disjoint", async () => {
	const op = IsDisjointSet("Set")(Constant("Array")([1, 2, 3]))(
		Constant("Array")([4, 5, 6]),
	)

	expect(await isDisjointSet(op)()).toMatchObject({
		right: [1, 2, 3],
	})
})

test("[isDisjointSet] (calculations::comparators::numerical) returns an error when sets are not disjoint", async () => {
	const op = IsDisjointSet("Set")(Constant("Array")([1, 2, 3, 4]))(
		Constant("Array")([4, 5, 6]),
	)

	expect(await isDisjointSet(op)()).toMatchObject({
		left: [
			{
				message: "[1,2,3,4] is not disjoint from [4,5,6]",
				operation: {
					datatype: "Set",
					operand: {
						datatype: "Array",
						tag: "Constant",
						value: [1, 2, 3, 4],
					},
					tag: "IsDisjointSet",
					test: {
						datatype: "Array",
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

test("[isDisjointSet] (calculations::comparators::numerical) returns an error when sets are invalid", async () => {
	const op = IsDisjointSet("Set")(Constant("Boolean")(true))(
		Constant("Array")([4, 5, 6]),
	)

	expect(await isDisjointSet(op)()).toMatchObject({
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
						datatype: "Array",
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
