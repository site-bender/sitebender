import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import Lookup from "../../../constructors/Lookup/index.ts"

Deno.test("Lookup should create a lookup element with default datatype Json", () => {
	const createLookup = Lookup()
	const result = createLookup("test-id")("test-value")

	assertEquals(result.tag, "Data")
	assertEquals(result.attributes.class, "lookup")
	assertEquals(result.attributes.id, "test-id")
	assertEquals(result.attributes.value, "test-value")
	assertEquals(result.dataset.type, "Json")
})

Deno.test("Lookup should create a lookup element with custom datatype", () => {
	const createXmlLookup = Lookup("Xml")
	const result = createXmlLookup("xml-id")("<root>data</root>")

	assertEquals(result.tag, "Data")
	assertEquals(result.attributes.class, "lookup")
	assertEquals(result.attributes.id, "xml-id")
	assertEquals(result.attributes.value, "<root>data</root>")
	assertEquals(result.dataset.type, "Xml")
})

Deno.test("Lookup should handle different value types", () => {
	const createLookup = Lookup("Mixed")

	const stringResult = createLookup("string-id")("string value")
	const numberResult = createLookup("number-id")(42)
	const booleanResult = createLookup("boolean-id")(true)
	const objectResult = createLookup("object-id")({ name: "test", value: 123 })
	const arrayResult = createLookup("array-id")([1, 2, 3])

	assertEquals(stringResult.attributes.value, "string value")
	assertEquals(numberResult.attributes.value, 42)
	assertEquals(booleanResult.attributes.value, true)
	assertEquals(objectResult.attributes.value, { name: "test", value: 123 })
	assertEquals(arrayResult.attributes.value, [1, 2, 3])
})

Deno.test("Lookup should maintain curried structure", () => {
	const createJsonLookup = Lookup("Json")
	const createUserLookup = createJsonLookup("user-lookup")

	// Should be able to reuse the partially applied functions
	const user1 = createUserLookup({ id: 1, name: "Alice" })
	const user2 = createUserLookup({ id: 2, name: "Bob" })

	assertEquals(user1.dataset.type, "Json")
	assertEquals(user1.attributes.id, "user-lookup")
	assertEquals(user1.attributes.value, { id: 1, name: "Alice" })

	assertEquals(user2.dataset.type, "Json")
	assertEquals(user2.attributes.id, "user-lookup")
	assertEquals(user2.attributes.value, { id: 2, name: "Bob" })
})

Deno.test("Lookup should handle empty and special values", () => {
	const createLookup = Lookup("Test")

	const emptyString = createLookup("empty-id")("")
	const nullValue = createLookup("null-id")(null)
	const undefinedValue = createLookup("undefined-id")(undefined)
	const zeroValue = createLookup("zero-id")(0)
	const falseValue = createLookup("false-id")(false)

	assertEquals(emptyString.attributes.value, "")
	assertEquals(nullValue.attributes.value, null)
	assertEquals(undefinedValue.attributes.value, undefined)
	assertEquals(zeroValue.attributes.value, 0)
	assertEquals(falseValue.attributes.value, false)
})

Deno.test("Lookup should handle different datatype formats", () => {
	const csvLookup = Lookup("Csv")("csv-id")("name,age\nAlice,25\nBob,30")
	const yamlLookup = Lookup("Yaml")("yaml-id")("name: Alice\nage: 25")
	const textLookup = Lookup("PlainText")("text-id")("Simple text data")

	assertEquals(csvLookup.dataset.type, "Csv")
	assertEquals(yamlLookup.dataset.type, "Yaml")
	assertEquals(textLookup.dataset.type, "PlainText")
})

Deno.test("Lookup should always create Data tag regardless of datatype", () => {
	const jsonLookup = Lookup("Json")("json-id")({})
	const xmlLookup = Lookup("Xml")("xml-id")("<data />")
	const customLookup = Lookup("CustomType")("custom-id")("custom-data")

	assertEquals(jsonLookup.tag, "Data")
	assertEquals(xmlLookup.tag, "Data")
	assertEquals(customLookup.tag, "Data")
})

Deno.test("Lookup should always have lookup class", () => {
	const lookup1 = Lookup("Type1")("id1")("value1")
	const lookup2 = Lookup("Type2")("id2")("value2")

	assertEquals(lookup1.attributes.class, "lookup")
	assertEquals(lookup2.attributes.class, "lookup")
})
