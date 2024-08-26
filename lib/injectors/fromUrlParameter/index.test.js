// @vitest-environment jsdom

import { expect, test } from "vitest"

import composeOperators from "../../operations/composers/composeOperators"
import FromUrlParameter from "../constructors/FromUrlParameter"

test("[FromUrlParameter] (injectors) returns an Right(value) when pattern matched", async () => {
	window.location = {
		pathname: "/name/Bob/age/42",
	}

	const patternOp = FromUrlParameter("String")({
		pattern: "/name/:name/age/:age",
	})

	expect(await composeOperators(patternOp)()).toMatchObject({
		right: {
			name: "Bob",
			age: "42",
		},
	})
})

test("[FromUrlParameter] (injectors) returns an Right(value) when segment found", async () => {
	window.location = {
		pathname: "/name/Bob/age/42",
	}

	const segmentOp = FromUrlParameter("String")({
		segment: 2,
	})

	expect(await composeOperators(segmentOp)()).toMatchObject({
		right: "Bob",
	})
})

test("[FromUrlParameter] (injectors) works with localVariables", async () => {
	const op = FromUrlParameter("String")({ local: "name" })

	expect(await composeOperators(op)(undefined, { name: "Bob" })).toMatchObject({
		right: "Bob",
	})
})

test("[FromUrlParameter] (injectors) returns a Left(Array(Errors)) when bad segment", async () => {
	const op = FromUrlParameter("Integer")("height")

	expect(await composeOperators(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Invalid parameters.",
				operation: {
					tag: "FromUrlParameter",
					datatype: "Integer",
				},
				type: "FromUrlParameter",
			},
		],
	})
})
