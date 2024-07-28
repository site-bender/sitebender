import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsSuperset from "../constructors/IsSuperset"
import isSuperset from "."

test("[isSuperset] (calculations::comparators::numerical) returns value when sets are disjoint", () => {
	const op = IsSuperset("Set")(Constant("Array")([1, 2, 3, 4, 5, 6]))(
		Constant("Array")([4, 5]),
	)

	expect(isSuperset(op)()).toMatchObject({
		right: [1, 2, 3, 4, 5, 6],
	})
})

test("[isSuperset] (calculations::comparators::numerical) returns an error when sets are not disjoint", () => {
	const op = IsSuperset("Set")(Constant("Array")([1, 2, 3]))(
		Constant("Array")([1, 2, 3, 4]),
	)

	expect(isSuperset(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "[1,2,3] is a superset of [1,2,3,4]",
				operation: {
					tag: "IsSuperset",
					datatype: "Set",
					operand: { tag: "Constant", datatype: "Array", value: [1, 2, 3] },
					test: { tag: "Constant", datatype: "Array", value: [1, 2, 3, 4] },
				},
				type: "IsSuperset",
			},
		],
	})
})

test("[isSuperset] (calculations::comparators::numerical) returns an error when sets are invalid", () => {
	const op = IsSuperset("Set")(Constant("Boolean")(true))(
		Constant("Array")([4, 5, 6]),
	)

	expect(isSuperset(op)()).toMatchObject({
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
					tag: "IsSuperset",
					test: {
						datatype: "Array",
						tag: "Constant",
						value: [4, 5, 6],
					},
				},
				tag: "Error",
				type: "IsSuperset",
			},
		],
	})
})
