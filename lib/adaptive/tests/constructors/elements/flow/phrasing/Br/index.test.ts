import { assertEquals, assertExists } from "@std/assert"

import Br from "../../../../../../constructors/elements/flow/phrasing/Br/index.ts"

Deno.test("Br should create a basic br with no attributes", () => {
	const br = Br()
	assertEquals(br.tag, "Br")
	assertExists(br.attributes)
})

Deno.test("Br should create a br with valid global attributes", () => {
	const br = Br({
		id: "line-break",
		class: "break",
	})

	assertEquals(br.tag, "Br")
	assertEquals(br.attributes["id"], "line-break")
	assertEquals(br.attributes["class"], "break")
})
