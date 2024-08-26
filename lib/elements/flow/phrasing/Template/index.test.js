// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import { SHADOW_ROOT_MODE } from "../../../../rendering/constants"
import TextNode from "../../../TextNode"
import Template from "."

test("[Template] (constructors::flow::miscellaneous) returns a blank <template> element with id", () => {
	render(document.body)(Template()())()

	const template = document.body.querySelector("template")

	expect(template?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Template] (constructors::flow::miscellaneous) returns <template> element with supplied attributes and children", () => {
	render(document.body)(
		Template({
			dataset: { name: "Bob" },
			grizmo: "gribbet",
			id: "id",
			shadowRootClonable: true,
			shadowRootDelegatesFocus: true,
			shadowRootMode: SHADOW_ROOT_MODE.open,
			shadowRootSerializable: true,
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<template id="id" shadowrootmode="open" shadowrootdelegatesfocus="" ` +
			`shadowrootclonable="" shadowrootserializable="" data-name="Bob"></template>`,
	)

	document.body.innerHTML = ""
})
