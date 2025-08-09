import { assertEquals, assertExists } from "@std/assert"

import Data from "../../../../../../constructors/elements/flow/phrasing/Data/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Data should create a basic data with no attributes or children", () => {
	const data = Data()([])
	assertEquals(data.tag, "Data")
	assertEquals(data.children, [])
	assertExists(data.attributes)
})

Deno.test("Data should create a data with valid attributes", () => {
	const data = Data({
		id: "product-price",
		value: "39.99",
	})([])

	assertEquals(data.tag, "Data")
	assertEquals(data.attributes["id"], "product-price")
	assertEquals(data.attributes["value"], "39.99")
})

Deno.test("Data should accept valid phrasing content children", () => {
	const text = TextNode("$39.99")
	const data = Data({ value: "39.99" })([text])

	assertEquals(data.tag, "Data")
	assertEquals(data.children.length, 1)
	assertEquals(data.children[0], text)
})
