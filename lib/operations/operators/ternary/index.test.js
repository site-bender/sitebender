import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import FromArgument from "../../../injectors/constructors/FromArgument"
import Ternary from "../../constructors/Ternary"
import ternary from "./"

test("[ternary] (operations::operators) works when condition is true", async () => {
	const op = Ternary(FromArgument("Boolean"))(Constant()(7))(Constant()(3))

	expect(await ternary(op)(true)).toMatchObject({ right: 7 })
})

test("[ternary] (operations::operators) works when condition is false", async () => {
	const op = Ternary(FromArgument("Boolean"))(Constant()(7))(Constant()(3))

	expect(await ternary(op)(false)).toMatchObject({ right: 3 })
})

test("[ternary] (calculations::operators) returns Left(Array(Errors)) on bad condition", async () => {
	const op = Ternary(Constant("String")())(Constant()(7))(Constant()(3))

	expect(await ternary(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "String",
				},
				type: "Constant",
			},
			{
				right: 3,
			},
			{
				right: 7,
			},
		],
	})
})

test("[ternary] (calculations::operators) returns Left(Array(Errors)) on bad ifTrue", async () => {
	const op = Ternary(Constant("Boolean")(true))(Constant()())(Constant()(3))

	expect(await ternary(op)()).toMatchObject({
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
				right: 3,
			},
			{
				right: true,
			},
		],
	})
})

test("[ternary] (calculations::operators) returns Left(Array(Errors)) on bad ifFalse", async () => {
	const op = Ternary(Constant("Boolean")(true))(Constant()(7))(Constant()())

	expect(await ternary(op)()).toMatchObject({
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
				right: true,
			},
			{
				right: 7,
			},
		],
	})
})
