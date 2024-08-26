import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsSubset from "../constructors/IsSubset"
import isSubset from "."

test("[isSubset] (calculations::comparators::numerical) returns value when sets are disjoint", async () => {
	const op = IsSubset("Set")(Constant("Array")([2, 3]))(
		Constant("Array")([1, 2, 3, 4, 5, 6]),
	)

	expect(await isSubset(op)()).toMatchObject({
		right: [2, 3],
	})
})

test("[isSubset] (calculations::comparators::numerical) returns an error when sets are not disjoint", async () => {
	const op = IsSubset("Set")(Constant("Array")([1, 2, 3, 4]))(
		Constant("Array")([2, 3, 4, 5, 6]),
	)

	expect(await isSubset(op)()).toMatchObject({
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

test("[isSubset] (calculations::comparators::numerical) returns an error when sets are invalid", async () => {
	const op = IsSubset("Set")(Constant("Boolean")(true))(
		Constant("Array")([4, 5, 6]),
	)

	expect(await isSubset(op)()).toMatchObject({
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

test("[isSubset] (calculations::comparators::set) returns Left(Array(Errors)) when bad operand", async () => {
	expect(
		await isSubset(
			IsSubset("Set")(Constant("Array")())(
				Constant("Array")([1, 2, 3, 4, 5, 6]),
			),
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
				right: [1, 2, 3, 4, 5, 6],
			},
		],
	})
})

test("[isSubset] (calculations::comparators::set) returns Left(Array(Errors)) when bad test", async () => {
	expect(
		await isSubset(
			IsSubset("Set")(Constant("Array")([2, 3]))(Constant("Array")()),
		)(),
	).toMatchObject({
		left: [
			{
				right: [2, 3],
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
