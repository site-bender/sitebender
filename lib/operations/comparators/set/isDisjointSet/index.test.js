import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsDisjointSet from "../constructors/IsDisjointSet"
import isDisjointSet from "."

test("[isDisjointSet] (calculations::comparators::set) returns value when sets are disjoint", async () => {
	const op = IsDisjointSet("Set")(Constant("Array")([1, 2, 3]))(
		Constant("Array")([4, 5, 6]),
	)

	expect(await isDisjointSet(op)()).toMatchObject({
		right: [1, 2, 3],
	})
})

test("[isDisjointSet] (calculations::comparators::set) returns an error when sets are not disjoint", async () => {
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

test("[isDisjointSet] (calculations::comparators::set) returns an error when sets are invalid", async () => {
	const op = IsDisjointSet("Set")(Constant("Boolean")(true))(
		Constant("Array")([4, 5, 6]),
	)

	expect(await isDisjointSet(op)()).toMatchObject({
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

test("[isDisjointSet] (calculations::comparators::set) returns Left(Array(Errors)) when bad operand", async () => {
	expect(
		await isDisjointSet(
			IsDisjointSet("Set")(Constant("Array")())(Constant("Array")([4, 5, 6])),
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
				right: [4, 5, 6],
			},
		],
	})
})

test("[isDisjointSet] (calculations::comparators::set) returns Left(Array(Errors)) when bad test", async () => {
	expect(
		await isDisjointSet(
			IsDisjointSet("Set")(Constant("Array")([1, 2, 3, 4]))(
				Constant("Array")(),
			),
		)(),
	).toMatchObject({
		left: [
			{
				right: [1, 2, 3, 4],
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
