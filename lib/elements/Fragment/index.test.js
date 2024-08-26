import { expect, test } from "vitest"

import TextNode from "../TextNode"
import Fragment from "./"

test("[Fragment] (elements) works with attributes and array of children", () => {
	const fragment = Fragment({
		scripts: "scripts",
		stylesheets: "stylesheets",
	})([TextNode("Text")])

	expect(fragment).toMatchObject({
		children: [
			{
				content: "Text",
				tag: "TextNode",
			},
		],
		scripts: "scripts",
		stylesheets: "stylesheets",
		tag: "Fragment",
	})
})

test("[Fragment] (elements) works without attributes and with single child", () => {
	const fragment = Fragment()(TextNode("Text"))

	expect(fragment).toMatchObject({
		children: [
			{
				content: "Text",
				tag: "TextNode",
			},
		],
		tag: "Fragment",
	})
})
