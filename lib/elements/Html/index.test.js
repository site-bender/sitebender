import { expect, test } from "vitest"

import TextNode from "../TextNode"
import Html from "./"

test("[Html] (elements) works with attributes and array of children", () => {
	const html = Html({
		id: "id",
		manifest: "manifest",
		xmlns: "xmlns",
	})([TextNode("Text")])

	expect(html).toMatchObject({
		attributes: {
			id: "id",
			manifest: "manifest",
			xmlns: "xmlns",
		},
		children: [
			{
				content: "Text",
				tag: "TextNode",
			},
		],
		tag: "Html",
	})
})

test("[Html] (elements) works without attributes or children", () => {
	const html = Html()()

	expect(html).toMatchObject({
		attributes: {},
		children: [],
		tag: "Html",
	})

	expect(html.attributes.id).toBeDefined()
})
