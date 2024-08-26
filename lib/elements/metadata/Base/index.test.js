// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../rendering"
import { TARGET } from "../../../rendering/constants"
import Base from "."

test("[Base] (constructors::flow::miscellaneous) returns a blank <base> element with id", () => {
	render(document.body)(Base())()

	const base = document.body.querySelector("base")

	expect(base?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Base] (constructors::flow::miscellaneous) returns <base> element with supplied attributes", () => {
	render(document.body)(
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
