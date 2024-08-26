import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsSuperset from "../constructors/IsSuperset"
import isSuperset from "."

test("[isSuperset] (calculations::comparators::numerical) returns value when sets are disjoint", async () => {
	const op = IsSuperset("Set")(Constant("Array")([1, 2, 3, 4, 5, 6]))(
		Constant("Array")([4, 5]),
	)

	expect(await isSuperset(op)()).toMatchObject({
		right: [1, 2, 3, 4, 5, 6],
	})
})

test("[isSuperset] (calculations::comparators::numerical) returns an error when sets are not disjoint", async () => {
	const op = IsSuperset("Set")(Constant("Array")([1, 2, 3]))(
		Constant("Array")([1, 2, 3, 4]),
	)

	expect(await isSuperset(op)()).toMatchObject({
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

test("[isSuperset] (calculations::comparators::numerical) returns an error when sets are invalid", async () => {
	const op = IsSuperset("Set")(Constant("Boolean")(true))(
		Constant("Array")([4, 5, 6]),
	)

	expect(await isSuperset(op)()).toMatchObject({
		left: [
			{
				message: "Error creating sets: TypeError: true is not iterable",
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

test("[isSuperset] (calculations::comparators::set) returns Left(Array(Errors)) when bad operand", async () => {
	expect(
		await isSuperset(
			IsSuperset("Set")(Constant("Array")())(Constant("Array")([4, 5])),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Array",
				},
				type: "Constant",
			},
			{
				right: [4, 5],
			},
		],
	})
})

test("[isSuperset] (calculations::comparators::set) returns Left(Array(Errors)) when bad test", async () => {
	expect(
		await isSuperset(
			IsSuperset("Set")(Constant("Array")([1, 2, 3, 4, 5, 6]))(
				Constant("Array")(),
			),
		)(),
	).toMatchObject({
		left: [
			{
				right: [1, 2, 3, 4, 5, 6],
			},
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Array",
				},
				type: "Constant",
			},
		],
	})
})
