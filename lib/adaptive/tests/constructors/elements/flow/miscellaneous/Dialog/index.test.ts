import { assertEquals, assertExists } from "@std/assert"

import Dialog from "../../../../../../constructors/elements/flow/miscellaneous/Dialog/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Dialog should create a basic dialog with no attributes or children", () => {
	const dialog = Dialog()([])
	assertEquals(dialog.tag, "Dialog")
	assertEquals(dialog.children, [])
	assertExists(dialog.attributes)
})

Deno.test("Dialog should create a dialog with valid global attributes", () => {
	const dialog = Dialog({
		id: "confirmation-dialog",
		class: "modal",
		open: true,
	})([])

	assertEquals(dialog.tag, "Dialog")
	assertEquals(dialog.attributes["id"], "confirmation-dialog")
	assertEquals(dialog.attributes["class"], "modal")
	assertEquals(dialog.attributes["open"], true)
})

Deno.test("Dialog should accept valid flow content children", () => {
	const text = TextNode("Dialog content")
	const dialog = Dialog({})([text])

	assertEquals(dialog.tag, "Dialog")
	assertEquals(dialog.children.length, 1)
	assertEquals(dialog.children[0], text)
})
