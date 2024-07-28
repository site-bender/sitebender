import { expect, test } from "vitest"

import pickGlobalAttributes from "."

const globalAttributes = {
	accesskey: "B",
	autocapitalize: "sentences",
	class: "no-class",
	contenteditable: true,
	dir: "ltr",
	draggable: false,
	enterkeyhint: "done",
	hidden: "",
	id: "id",
	inert: true,
	inputmode: "numeric",
	itemid: "itemid",
	itemref: "itemref",
	itemscope: true,
	itemtype: "itemtype",
	lang: "en",
	nonce: "123",
	popover: "auto",
	spellcheck: "",
	style: { color: "red" },
	tabIndex: "-1",
	title: "title",
	translate: "no",
}

test("[pickGlobalAttributes] (guards) returns all type-checked global attributes", () => {
	expect(pickGlobalAttributes(globalAttributes)).toMatchObject({
		...globalAttributes,
		style: "color: red",
	})
})

test("[pickGlobalAttributes] (guards) omits non-global attributes", () => {
	expect(
		pickGlobalAttributes({
			...globalAttributes,
			spellcheck: true,
			test: true,
			other: "blue",
		}),
	).toMatchObject({
		...globalAttributes,
		spellcheck: true,
		style: "color: red",
	})
})
