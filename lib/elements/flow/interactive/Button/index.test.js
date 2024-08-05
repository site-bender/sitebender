import { expect, test } from "vitest"

import Button from "./"

test("[Button] (elements::flow::interactive) works", () => {
	const button = Button({
		aria: {
			controls: "tabpanel-3",
			selected: "false",
		},
		id: "tab-3",
		role: "tab",
		type: "button",
	})("Bob")

	expect(button).toMatchObject({
		attributes: {
			"id": "tab-3",
			"aria-controls": "tabpanel-3",
			"aria-selected": "false",
			"type": "button",
			"role": "tab",
		},
		children: [{ content: "Bob", tag: "TextNode" }],
		tag: "Button",
	})
})
