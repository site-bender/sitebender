import { expect, test } from "vitest"

import hasDescendant from "."

test("[hasDescendant] (guards) returns true when object has child with the tag", () => {
	expect(
		hasDescendant({
			children: [
				{
					children: [{ tag: "Area" }, { tag: "P" }, { tag: "A" }],
					tag: "Div",
				},
				{
					tag: "Body",
				},
			],
			tag: "Article",
		})(["A"]),
	).toBe(true)
})

test("[hasDescendant] (guards) returns true when object has child with one of `tags`", () => {
	expect(
		hasDescendant({
			children: [
				{
					children: [{ tag: "Area" }, { tag: "P" }, { tag: "A" }],
					tag: "Div",
				},
				{
					tag: "Body",
				},
			],
			tag: "Article",
		})(["ABBR", "IFRAME", "A", "EMBED"]),
	).toBe(true)
})

test("[hasDescendant] (guards) returns false when object does not have child with one of `tags`", () => {
	expect(
		hasDescendant({
			children: [
				{
					children: [{ tag: "Area" }, { tag: "P" }, { tag: "A" }],
					tag: "Div",
				},
				{
					tag: "Body",
				},
			],
			tag: "Article",
		})(["Audio", "TextArea"]),
	).toBe(false)
})
