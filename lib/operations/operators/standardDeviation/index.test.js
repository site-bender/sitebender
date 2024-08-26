import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import StandardDeviation from "../constructors/StandardDeviation"
import standardDeviation from "."

test("[standardDeviation] (calculations::operators) gets the standard deviation", async () => {
	const op = StandardDeviation("Number")(false)([
		Constant("Number")(7),
		Constant("Number")(5),
		Constant("Number")(13),
		Constant("Number")(9),
		Constant("Number")(11),
	])

	expect(await standardDeviation(op)()).toMatchObject({
		right: 3.1622776601683795,
	})
})

test("[standardDeviation] (calculations::operators) gets the population standard deviation", async () => {
	const op = StandardDeviation("Number")(true)([
		Constant("Number")(7),
		Constant("Number")(5),
		Constant("Number")(13),
		Constant("Number")(9),
		Constant("Number")(11),
	])

	expect(await standardDeviation(op)()).toMatchObject({
		right: 2.8284271247461903,
	})
})

test("[standardDeviation] (calculations::operators) returns a left error if array empty", async () => {
	const op = StandardDeviation("Number")(false)([])

	expect(await standardDeviation(op)()).toMatchObject({
		left: {
			message: "Cannot take root mean square of an empty array.",
			operation: {
				datatype: "Number",
				operands: [],
				tag: "StandardDeviation",
			},
			tag: "Error",
			type: "standardDeviation",
		},
	})
})

test("[standardDeviation] (calculations::operators) returns Left(Array(Errors)) on bad operand", async () => {
	const op = StandardDeviation("Number")(false)([
		Constant("Number")(7),
		Constant("Number")(5),
		Constant("Number")(),
		Constant("Number")(9),
		Constant("Number")(11),
	])

	expect(await standardDeviation(op)()).toMatchObject({
		left: [
			{
				right: [7, 5],
			},
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Number",
				},
				type: "Constant",
			},
			{
				right: 9,
			},
			{
				right: 11,
			},
		],
	})
})
