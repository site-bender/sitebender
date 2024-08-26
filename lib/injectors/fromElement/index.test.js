// @vitest-environment jsdom

import { expect, test } from "vitest"

import composeOperators from "../../operations/composers/composeOperators"
import FromElement from "../constructors/FromElement"

document.body.innerHTML = `
	<span id="int">33</span>
`

test("[FromElement] (injectors) returns a Right(value) when element found", async () => {
	const op = FromElement("Integer")({
		selector: "span#int",
	})

	expect(await composeOperators(op)()).toMatchObject({
		right: 33,
	})
})

test("[FromElement] (injectors) returns a Right(value) from localValues", async () => {
	const op = FromElement("Integer")({
		local: "span#int",
		selector: "span#int",
	})

	expect(
		await composeOperators(op)(undefined, { "span#int": 44 }),
	).toMatchObject({
		right: 44,
	})
})

test("[FromElement] (injectors) returns a Left(Array(Errors)) when element not found", async () => {
	const op = FromElement("String")({
		selector: "div#str",
	})

	expect(await composeOperators(op)()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: [
					{
						tag: "Error",
						message: "Element at `div#str` not found.",
						operation: {
							tag: "FromElement",
							datatype: "String",
							source: {
								selector: "div#str",
							},
						},
						type: "FromElement",
					},
				],
				operation: {
					tag: "FromElement",
					datatype: "String",
					source: {
						selector: "div#str",
					},
				},
				type: "FromElement",
			},
		],
	})
})
