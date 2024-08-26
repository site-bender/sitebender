// @vitest-environment jsdom

import { expect, test } from "vitest"

import composeOperators from "../../operations/composers/composeOperators"
import FromQueryString from "../constructors/FromQueryString"

test("[FromQueryString] (injectors) returns an Right(value) when key-value found", async () => {
	window.location = {
		search: "?name=Bob&age=42",
	}

	const nameOp = FromQueryString("String")("name")

	expect(await composeOperators(nameOp)()).toMatchObject({
		right: "Bob",
	})

	const ageOp = FromQueryString("Integer")("age")

	expect(await composeOperators(ageOp)()).toMatchObject({
		right: 42,
	})
})

test("[FromQueryString] (injectors) works with localVariables", async () => {
	const op = FromQueryString("String")("name")

	expect(await composeOperators(op)(undefined, { name: "Bob" })).toMatchObject({
		right: "Bob",
	})
})

test("[FromQueryString] (injectors) returns a Left(Array(Errors)) when key not found", async () => {
	const op = FromQueryString("Integer")("height")

	expect(await composeOperators(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: 'Unable to find key "height" in URL search string.',
				operation: {
					tag: "FromQueryString",
					datatype: "Integer",
					key: "height",
					options: {
						local: "height",
					},
				},
				type: "FromQueryString",
			},
		],
	})
})

test("[FromQueryString] (injectors) returns a Left(Array(Errors)) when bad cast", async () => {
	window.location = {
		search: "?name=Bob&age=42",
	}

	const nameOp = FromQueryString("Boolean")("age")

	expect(await composeOperators(nameOp)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: [
					{
						tag: "Error",
						message: 'Cannot cast "42" to a boolean.',
						operation: "42",
						type: "castToBoolean",
					},
				],
				operation: {
					tag: "FromQueryString",
					datatype: "Boolean",
					key: "age",
					options: {
						local: "age",
					},
				},
				type: "FromQueryString",
			},
		],
	})
})
