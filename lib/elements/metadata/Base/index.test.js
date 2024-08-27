// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../rendering/renderTo"
import { TARGET } from "../../../rendering/constants"
import Base from "."

test("[Base] (constructors::flow::miscellaneous) returns a blank <base> element with id", () => {
	renderTo(document.body)(Base())()

	const base = document.body.querySelector("base")

	expect(base?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Base] (constructors::flow::miscellaneous) returns <base> element with supplied attributes", () => {
	renderTo(document.body)(
		Base({
			dataset: {
				name: "Bob",
			},
			grizmo: "gribbet",
			href: "/",
			id: "id",
			target: TARGET._blank,
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<base id="id" href="/" target="_blank" data-name="Bob">`,
	)

	document.body.innerHTML = ""
})
