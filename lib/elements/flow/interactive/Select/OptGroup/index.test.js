// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import OptGroup from "./"

test("[OptGroup] (constructors::flow::interactive::Select) returns an <optgroup> without content", () => {
	renderTo(document.body)(OptGroup()())()

	const optgroup = document.body.querySelector("optgroup")

	expect(optgroup?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[OptGroup] (elements::flow::interactive::Select) returns an <optgroup> with attributes and content", () => {
	renderTo(document.body)(
		OptGroup({
			disabled: true,
			grizmo: "gribbet",
			id: "id",
			label: "label",
		})(),
	)()

	expect(document.body.innerHTML).toEqual(
		`<optgroup id="id" disabled="" label="label"></optgroup>`,
	)
})
