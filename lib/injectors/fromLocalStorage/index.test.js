import { expect, test } from "vitest"

import composeOperators from "../../operations/composers/composeOperators"
import FromLocalStorage from "../constructors/FromLocalStorage"

test("[FromLocalStorage] (injectors) returns an Right(value) when key-value found", async () => {
	globalThis.localStorage.setItem("name", "Bob")

	const op = FromLocalStorage("String")("name")

	expect(await composeOperators(op)()).toMatchObject({
		right: "Bob",
	})

	globalThis.localStorage.removeItem("name")
})

test("[FromLocalStorage] (injectors) returns a Right(value) from localValues", async () => {
	const op = FromLocalStorage("String")("name")

	expect(await composeOperators(op)(undefined, { name: "Jane" })).toMatchObject(
		{
			right: "Jane",
		},
	)
})

test("[FromLocalStorage] (injectors) returns a Left(Array(Errors)) when key not found", async () => {
	const op = FromLocalStorage("Integer")("age")

	expect(await composeOperators(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: 'Value at key "age" not found.',
				operation: {
					tag: "FromLocalStorage",
					datatype: "Integer",
					key: "age",
				},
				type: "FromLocalStorage",
			},
		],
	})
})

test("[FromLocalStorage] (injectors) returns a Left(Array(Errors)) when bad cast", async () => {
	globalThis.localStorage.setItem("age", "42")

	const op = FromLocalStorage("Boolean")("age")

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
			tag: "FromLocalStorage",
			datatype: "Boolean",
			key: "age",
			options: {
				local: "age",
			},
		},
		type: "FromLocalStorage",
	})

	globalThis.localStorage.removeItem("age")
})
