// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import addAttributes from "./"

const dom = new JSDOM(`<!DOCTYPE html>
	<div id="div"></div>
`)

globalThis.document = dom.window.document

test("[addAttributes] (rendering::buildDomTree) adds the attributes", () => {
	const div = document.querySelector("#div")

	addAttributes(div)({
		class: "class",
		id: "id",
		rel: "rel",
		required: true,
	})

	expect(document.body.innerHTML.trim()).toEqual(
		`<div id="id" class="class" rel="rel" required=""></div>`,
	)
})
