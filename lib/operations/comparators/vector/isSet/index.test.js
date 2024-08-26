import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsSet from "../constructors/IsSet"
import isSet from "."

test("[isSet] (calculations::comparators::scalar) returns set when valid set", async () => {
	expect(
		await isSet(IsSet(Constant("Array")(["red", "green", "blue"])))(),
	).toMatchObject({
		right: ["red", "green", "blue"],
	})
})

test("[isSet] (calculations::comparators::scalar) returns error when duplicate values", async () => {
	expect(
		await isSet(IsSet(Constant("Array")(["red", "green", "blue", "green"])))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					'["red","green","blue","green"] has duplicate members (not a set).',
				operation: {
					tag: "IsSet",
					datatype: "Set",
					operand: {
						tag: "Constant",
						datatype: "Array",
						value: ["red", "green", "blue", "green"],
					},
				},
				type: "IsSet",
			},
		],
	})
})

test("[isSet] (calculations::comparators::scalar) returns an error when not a boolean", async () => {
	expect(await isSet(IsSet(Constant("Number")(66.6)))()).toMatchObject({
		left: [
			{
				message:
					"Error creating set from 66.6: TypeError: number 66.6 is not iterable (cannot read property Symbol(Symbol.iterator)).",
				operation: {
					datatype: "Set",
					operand: {
						datatype: "Number",
						tag: "Constant",
						value: 66.6,
					},
					tag: "IsSet",
				},
				tag: "Error",
				type: "IsSet",
			},
		],
	})
})

test("[isSet] (calculations::comparators::numerical) returns Left(Array(Errors)) when bad operand", async () => {
	expect(await isSet(IsSet(Constant("Array")()))()).toMatchObject({
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
		],
	})
})

test("[isSet] (calculations::comparators::numerical) returns Left(Array(Errors)) when bad map", async () => {
	expect(await isSet(IsSet(Constant("Array")({})))()).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					"Error creating set from {}: TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator)).",
				operation: {
					tag: "IsSet",
					datatype: "Set",
					operand: {
						tag: "Constant",
						datatype: "Array",
						value: {},
					},
				},
				type: "IsSet",
			},
		],
	})
})
