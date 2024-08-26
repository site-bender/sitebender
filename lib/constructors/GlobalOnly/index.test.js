import { expect, test } from "vitest"

import GlobalOnly from "./"

test("[GlobalOnly] (constructors) works", () => {
	expect(
		GlobalOnly("Div")({ id: "id" })([
			{
				content: "This is the content.",
				tag: "TextNode",
			},
		]),
	).toMatchObject({
		attributes: {
			id: "id",
		},
		children: [
			{
				content: "This is the content.",
				tag: "TextNode",
			},
		],
		tag: "Div",
	})
})

test("[GlobalOnly] (constructors) works", () => {
	const config = GlobalOnly("Div")({
		aria: { hidden: true },
		calculation: "calculation",
		class: "class",
		dataset: { value: "value" },
		display: "display",
		format: "format",
		scripts: "scripts",
		stylesheets: "stylesheets",
	})([
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])

	expect(config.attributes.id).toBeDefined()
	expect(config).toMatchObject({
		attributes: {
			"class": "class",
			"aria-hidden": true,
		},
		children: [
			{
				content: "This is the content.",
				tag: "TextNode",
			},
		],
		calculation: "calculation",
		dataset: {
			value: "value",
		},
		display: "display",
		format: "format",
		scripts: "scripts",
		stylesheets: "stylesheets",
		tag: "Div",
	})
})
