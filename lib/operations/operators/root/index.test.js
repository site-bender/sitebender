import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Root from "../constructors/Root"
import root from "./"

test("[root] (calculations::operators) returns Right(value)", async () => {
	const op = Root("Number")(Constant()(144))(Constant()(2))

	expect(await root(op)()).toMatchObject({ right: 12 })
})

test("[root] (calculations::operators) returns Left(Array(Errors)) on index zero", async () => {
	const op = Root("Number")(Constant()(144))(Constant()(0))

	expect(await root(op)()).toMatchObject({
		left: [
			{
				right: 144,
			},
			{
				tag: "Error",
				message: "Cannot take the 0th root.",
				operation: {
					tag: "Root",
					radicand: {
						tag: "Constant",
						datatype: "Number",
						value: 144,
					},
					index: {
						tag: "Constant",
						datatype: "Number",
						value: 0,
					},
					datatype: "Number",
				},
				type: "Root",
			},
		],
	})
})

test("[root] (calculations::operators) returns Left(Array(Errors)) on bad base", async () => {
	const op = Root("Number")(Constant()())(Constant()(2))

	expect(await root(op)()).toMatchObject({
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
				right: 2,
			},
		],
	})
})

test("[root] (calculations::operators) returns Left(Array(Errors)) on bad exponent", async () => {
	const op = Root("Number")(Constant()(12))(Constant()())

	expect(await root(op)()).toMatchObject({
		left: [
			{
				right: 12,
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
