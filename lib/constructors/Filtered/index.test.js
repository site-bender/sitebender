import { expect, test } from "vitest"

import TextNode from "../../elements/TextNode"
import Filtered from "./"

test("[Filtered] (constructors) works with array of children", () => {
	const filtered = Filtered("Span")()

	expect(filtered({ id: "id" })([TextNode("Text")])).toMatchObject({
		attributes: { id: "id" },
		children: [{ content: "Text", tag: "TextNode" }],
		tag: "Span",
	})
})

test("[Filtered] (constructors) works with single child", () => {
	const filtered = Filtered()(a => a)

	expect(
		filtered({
			calculation: "calculation",
			dataset: "dataset",
			display: "display",
			format: "format",
			href: "/",
			id: "id",
			scripts: "scripts",
			stylesheets: "stylesheets",
		})(TextNode("Text")),
	).toMatchObject({
		attributes: {
			id: "id",
			href: "/",
		},
		children: [
			{
				content: "Text",
				tag: "TextNode",
			},
		],
		calculation: "calculation",
		dataset: "dataset",
		display: "display",
		format: "format",
		scripts: "scripts",
		stylesheets: "stylesheets",
		tag: "A",
	})
})
