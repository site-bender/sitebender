import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsOverlappingSet from "../constructors/IsOverlappingSet"
import isOverlappingSet from "."

test("[isOverlappingSet] (calculations::comparators::numerical) returns value when sets are disjoint", async () => {
	const op = IsOverlappingSet("Set")(Constant("Array")([1, 2, 3, 4, 5]))(
		Constant("Array")([4, 5, 6]),
	)

	expect(await isOverlappingSet(op)()).toMatchObject({
		right: [1, 2, 3, 4, 5],
	})
})

test("[isOverlappingSet] (calculations::comparators::numerical) returns an error when sets are not disjoint", async () => {
	const op = IsOverlappingSet("Set")(Constant("Array")([1, 2, 3]))(
		Constant("Array")([4, 5, 6]),
	)

	expect(await isOverlappingSet(op)()).toMatchObject({
		left: [
			{
				message: "[1,2,3] does not overlap with [4,5,6]",
				operation: {
					datatype: "Set",
					operand: {
						datatype: "Array",
						tag: "Constant",
						value: [1, 2, 3],
					},
					tag: "IsOverlappingSet",
					test: {
						datatype: "Array",
						tag: "Constant",
						value: [4, 5, 6],
					},
				},
				tag: "Error",
				type: "IsOverlappingSet",
			},
		],
	})
})

test("[isOverlappingSet] (calculations::comparators::numerical) returns an error when sets are invalid", async () => {
	const op = IsOverlappingSet("Set")(Constant("Boolean")(true))(
		Constant("Array")([4, 5, 6]),
	)

	expect(await isOverlappingSet(op)()).toMatchObject({
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
					tag: "IsOverlappingSet",
					test: {
						datatype: "Array",
						tag: "Constant",
						value: [4, 5, 6],
					},
				},
				tag: "Error",
				type: "IsOverlappingSet",
			},
		],
	})
})

test("[isOverlappingSet] (calculations::comparators::set) returns Left(Array(Errors)) when bad operand", async () => {
	expect(
		await isOverlappingSet(
			IsOverlappingSet("Set")(Constant("Array")())(
				Constant("Array")([4, 5, 6]),
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
				right: [4, 5, 6],
			},
		],
	})
})

test("[isOverlappingSet] (calculations::comparators::set) returns Left(Array(Errors)) when bad test", async () => {
	expect(
		await isOverlappingSet(
			IsOverlappingSet("Set")(Constant("Array")([1, 2, 3, 4, 5]))(
				Constant("Array")(),
			),
		)(),
	).toMatchObject({
		left: [
			{
				right: [1, 2, 3, 4, 5],
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
