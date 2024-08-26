import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import Ternary from "../../../constructors/Ternary"
import ternary from "./"

test("[ternary] (operations::comparators::custom) returns Right(ifTrue) when true", async () => {
	expect(
		await ternary(
			Ternary(Constant("Boolean")(true))(Constant("Integer")(1))(
				Constant("Integer")(0),
			),
		)(),
	).toMatchObject({ right: 1 })
})

test("[ternary] (operations::comparators::custom) returns Right(ifFalse) when false", async () => {
	expect(
		await ternary(
			Ternary(Constant("Boolean")(false))(Constant("Integer")(1))(
				Constant("Integer")(0),
			),
		)(),
	).toMatchObject({ right: 0 })
})

test("[ternary] (operations::comparators::custom) returns Left(Array(Errors)) when condition fails", async () => {
	expect(
		await ternary(
			Ternary(Constant("Boolean")())(Constant("Integer")(1))(
				Constant("Integer")(0),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Boolean",
				},
				type: "Constant",
			},
			{
				right: 0,
			},
			{
				right: 1,
			},
		],
	})
})

test("[ternary] (operations::comparators::custom) returns Left(Array(Errors)) when ifTrue fails", async () => {
	expect(
		await ternary(
			Ternary(Constant("Boolean")(true))(Constant("Integer")())(
				Constant("Integer")(0),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Integer",
				},
				type: "Constant",
			},
			{
				right: 0,
			},
			{
				right: true,
			},
		],
	})
})

test("[ternary] (operations::comparators::custom) returns Left(Array(Errors)) when ifFalse fails", async () => {
	expect(
		await ternary(
			Ternary(Constant("Boolean")(true))(Constant("Integer")(1))(
				Constant("Integer")(),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "Integer",
				},
				type: "Constant",
			},
			{
				right: true,
			},
			{
				right: 1,
			},
		],
	})
})
