// @vitest-environment jsdom

import { expect, test } from "vitest"

import composeOperators from "../../operations/composers/composeOperators"
import FromLookup from "../constructors/FromLookup"

document.body.innerHTML = `
	<span id="int">33</span>
`

test("[FromLookup] (injectors) returns a Right(value) when lookup key found", async () => {
	const op = FromLookup("Integer")("int")

	expect(await composeOperators(op)()).toMatchObject({
		right: 33,
	})
})

test("[FromLookup] (injectors) returns a Right(value) from localValues", async () => {
	const op = FromLookup("Integer")("int")

	expect(await composeOperators(op)(undefined, { int: 44 })).toMatchObject({
		right: 44,
	})
})

test("[FromLookup] (injectors) returns a Left(Array(Errors)) when element not found", async () => {
	const op = FromLookup("String")("str")

	expect(await composeOperators(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: [
					{
						tag: "Error",
						message: "Element at `#str` not found.",
						operation: {
							tag: "FromLookup",
							datatype: "String",
							source: {
								class: "lookup",
								id: "str",
								local: "str",
							},
						},
						type: "FromLookup",
					},
				],
				operation: {
					tag: "FromLookup",
					datatype: "String",
					source: {
						class: "lookup",
						id: "str",
						local: "str",
					},
				},
				type: "FromLookup",
			},
		],
	})
})
