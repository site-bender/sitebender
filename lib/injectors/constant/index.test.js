import { expect, test } from "vitest"

import Constant from "../constructors/Constant"
import constant from "."

test("[constant] (guards) returns true when passed a boolean", async () => {
	expect(await constant(Constant("String")(""))()).toMatchObject({ right: "" })
	expect(await constant(Constant("Integer")(42))()).toMatchObject({ right: 42 })
	expect(await constant(Constant("Boolean")(false))()).toMatchObject({
		right: false,
	})
})

test("[constant] (guards) returns true when passed a bad content", async () => {
	expect(await constant(Constant("String")())()).toMatchObject({
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
		],
	})
	expect(await constant(Constant("String")(666))()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is not a string.",
				operation: {
					tag: "Constant",
					datatype: "String",
				},
				type: "Constant",
			},
		],
	})
	expect(await constant(Constant("Integer")(false))()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is not a number.",
				operation: {
					tag: "Constant",
					datatype: "Integer",
				},
				type: "Constant",
			},
		],
	})
	expect(await constant(Constant("Integer")(null))()).toMatchObject({
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
		],
	})
})
