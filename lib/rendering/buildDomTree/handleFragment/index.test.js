// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import handleFragment from "./"

const dom = new JSDOM(`<!DOCTYPE html><body></body>`)

globalThis.document = dom.window.document

const fragment = {
	children: [
		{
			children: [
				{
					content: "This is the subtitle",
					tag: "TextNode",
				},
			],
			tag: "Hn",
		},
		{
			children: [
				{
					content: "This is the subtext. Shhh.",
					tag: "TextNode",
				},
			],
			tag: "P",
		},
		{
			content: "More stuff.",
			tag: "TextNode",
		},
	],
	tag: "Fragment",
}

test("[handleFragment] (rendering::buildDomTree) renders children", () => {
	handleFragment(document.body)(fragment.children)()

	expect(document.body.innerHTML.trim()).toEqual(
		`<h0>This is the subtitle</h0><p>This is the subtext. Shhh.</p>More stuff.`,
	)

	document.body.innerHTML = ""
})

test("[handleFragment] (rendering::buildDomTree) works with missing children", () => {
	handleFragment(document.body)()()

	expect(document.body.innerHTML.trim()).toEqual("")

	document.body.innerHTML = ""
})
