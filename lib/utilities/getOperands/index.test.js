import { expect, test } from "vitest"

import Constant from "../../injectors/constructors/Constant"
import getOperands from "./"

test("[getOperands] (utilities) returns operand and test values when no errors", async () => {
	const ops = await getOperands({
		operand: Constant()(3),
		test: Constant()(5),
	})()

	expect(ops).toMatchObject([3, 5])
})

test("[getOperands] (utilities) returns Left(Array(Error)) values when operand errors", async () => {
	const ops = await getOperands({
		operand: Constant()(),
		test: Constant()(5),
	})()

	expect(ops).toMatchObject({
		left: [
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
				right: 5,
			},
		],
	})
})

test("[getOperands] (utilities) returns Left(Array(Error)) values when test errors", async () => {
	const ops = await getOperands({
		operand: Constant()(3),
		test: Constant()(),
	})()

	expect(ops).toMatchObject({
		left: [
			{
				right: 3,
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
		],
	})
})

test("[getOperands] (utilities) returns Left(Array(Error)) values when both operand and test error", async () => {
	const ops = await getOperands({
		operand: Constant()(),
		test: Constant()(),
	})()

	expect(ops).toMatchObject({
		left: [
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
				left: [
					{
						tag: "Error",
						message: "Value is missing.",
						operation: {
							tag: "Constant",
							datatype: "Number",
						},
						type: "Constant",
					},
				],
			},
		],
	})
})
