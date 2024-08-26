import { expect, test } from "vitest"

import composeOperators from "../../operations/composers/composeOperators"
import FromSessionStorage from "../constructors/FromSessionStorage"

test("[FromSessionStorage] (injectors) returns an Right(value) when key-value found", async () => {
	globalThis.sessionStorage.setItem("name", "Bob")

	const op = FromSessionStorage("String")("name")

	expect(await composeOperators(op)()).toMatchObject({
		right: "Bob",
	})

	globalThis.sessionStorage.removeItem("name")
})

test("[FromSessionStorage] (injectors) works with localVariables", async () => {
	const op = FromSessionStorage("String")("name")

	expect(await composeOperators(op)(undefined, { name: "Bob" })).toMatchObject({
		right: "Bob",
	})
})

test("[FromSessionStorage] (injectors) returns a Left(Array(Errors)) when key not found", async () => {
	const op = FromSessionStorage("Integer")("age")

	expect(await composeOperators(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: 'Value at key "age" not found.',
				operation: {
					tag: "FromSessionStorage",
					datatype: "Integer",
					key: "age",
				},
				type: "FromSessionStorage",
			},
		],
	})
})

test("[FromSessionStorage] (injectors) returns a Left(Array(Errors)) when bad cast", async () => {
	globalThis.sessionStorage.setItem("age", "42")

	const op = FromSessionStorage("Boolean")("age")

	expect(await composeOperators(op)()).toMatchObject({
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
			tag: "FromSessionStorage",
			datatype: "Boolean",
			key: "age",
			options: {
				local: "age",
			},
		},
		type: "FromSessionStorage",
	})

	globalThis.sessionStorage.removeItem("age")
})
