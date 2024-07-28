import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsMap from "../constructors/IsMap"
import isMap from "."

test("[isMap] (calculations::comparators::scalar) returns value when a Map", () => {
	const map = new Map([
		["red", "#f00"],
		["green", "#0f0"],
		["blue", "#00f"],
	])
	expect(isMap(IsMap(Constant("Map")(map)))()).toMatchObject({
		right: map,
	})
})

test("[isMap] (calculations::comparators::scalar) returns value when a Map", () => {
	console.log(
		JSON.stringify(isMap(IsMap(Constant("Array")(["red", "green", "blue"])))()),
	)
	expect(
		isMap(IsMap(Constant("Array")(["red", "green", "blue"])))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message:
					'Error creating map from ["red","green","blue"]: TypeError: Iterator value red is not an entry object.',
				operation: {
					tag: "IsMap",
					datatype: "Map",
					operand: {
						tag: "Constant",
						datatype: "Array",
						value: ["red", "green", "blue"],
					},
				},
				type: "IsMap",
			},
		],
	})
})

test("[isMap] (calculations::comparators::scalar) returns an error when not a boolean", () => {
	expect(isMap(IsMap(Constant("Number")(66.6)))()).toMatchObject({
		left: [
			{
				message:
					"Error creating map from 66.6: TypeError: number 66.6 is not iterable (cannot read property Symbol(Symbol.iterator)).",
				operation: {
					datatype: "Map",
					operand: {
						datatype: "Number",
						tag: "Constant",
						value: 66.6,
					},
					tag: "IsMap",
				},
				tag: "Error",
				type: "IsMap",
			},
		],
	})
})