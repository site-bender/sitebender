import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import LookupTable from "../../../constructors/LookupTable/index.ts"

Deno.test("LookupTable should create a lookup table element with default datatype Json", () => {
	const createLookupTable = LookupTable()
	const result = createLookupTable("test-id")({ users: ["Alice", "Bob"] })

	assertEquals(result.tag, "Data")
	assertEquals(result.attributes.class, "lookup-table")
	assertEquals(result.attributes.id, "test-id")
	assertEquals(result.attributes.value, { users: ["Alice", "Bob"] })
	assertEquals(result.dataset.type, "Json")
})

Deno.test("LookupTable should create a lookup table element with custom datatype", () => {
	const createCsvTable = LookupTable("Csv")
	const csvData = "name,age\nAlice,25\nBob,30"
	const result = createCsvTable("csv-table")(csvData)

	assertEquals(result.tag, "Data")
	assertEquals(result.attributes.class, "lookup-table")
	assertEquals(result.attributes.id, "csv-table")
	assertEquals(result.attributes.value, csvData)
	assertEquals(result.dataset.type, "Csv")
})

Deno.test("LookupTable should handle different table types", () => {
	const createTable = LookupTable("Database")

	const arrayTable = createTable("array-table")([
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
	])

	const objectTable = createTable("object-table")({
		users: { 1: "Alice", 2: "Bob" },
		roles: { 1: "admin", 2: "user" },
	})

	const stringTable = createTable("string-table")("id|name\n1|Alice\n2|Bob")

	assertEquals(arrayTable.attributes.value, [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
	])
	assertEquals(objectTable.attributes.value, {
		users: { 1: "Alice", 2: "Bob" },
		roles: { 1: "admin", 2: "user" },
	})
	assertEquals(stringTable.attributes.value, "id|name\n1|Alice\n2|Bob")
})

Deno.test("LookupTable should maintain curried structure", () => {
	const createJsonTable = LookupTable("Json")
	const createUserTable = createJsonTable("user-table")

	// Should be able to reuse the partially applied functions
	const table1 = createUserTable([{ id: 1, name: "Alice" }])
	const table2 = createUserTable([{ id: 2, name: "Bob" }])

	assertEquals(table1.dataset.type, "Json")
	assertEquals(table1.attributes.id, "user-table")
	assertEquals(table1.attributes.value, [{ id: 1, name: "Alice" }])

	assertEquals(table2.dataset.type, "Json")
	assertEquals(table2.attributes.id, "user-table")
	assertEquals(table2.attributes.value, [{ id: 2, name: "Bob" }])
})

Deno.test("LookupTable should handle empty and special table values", () => {
	const createTable = LookupTable("Test")

	const emptyArray = createTable("empty-array")([])
	const emptyObject = createTable("empty-object")({})
	const nullTable = createTable("null-table")(null)
	const undefinedTable = createTable("undefined-table")(undefined)
	const emptyString = createTable("empty-string")("")

	assertEquals(emptyArray.attributes.value, [])
	assertEquals(emptyObject.attributes.value, {})
	assertEquals(nullTable.attributes.value, null)
	assertEquals(undefinedTable.attributes.value, undefined)
	assertEquals(emptyString.attributes.value, "")
})

Deno.test("LookupTable should handle different datatype formats", () => {
	const csvTable = LookupTable("Csv")("csv-table")("name,age\nAlice,25\nBob,30")
	const sqlTable = LookupTable("Sql")("sql-table")("SELECT * FROM users")
	const jsonTable = LookupTable("Json")("json-table")({ data: [1, 2, 3] })
	const xmlTable = LookupTable("Xml")("xml-table")(
		"<table><row>data</row></table>",
	)

	assertEquals(csvTable.dataset.type, "Csv")
	assertEquals(sqlTable.dataset.type, "Sql")
	assertEquals(jsonTable.dataset.type, "Json")
	assertEquals(xmlTable.dataset.type, "Xml")
})

Deno.test("LookupTable should always create Data tag regardless of datatype", () => {
	const jsonTable = LookupTable("Json")("json-table")({})
	const csvTable = LookupTable("Csv")("csv-table")("")
	const customTable = LookupTable("CustomType")("custom-table")("custom-data")

	assertEquals(jsonTable.tag, "Data")
	assertEquals(csvTable.tag, "Data")
	assertEquals(customTable.tag, "Data")
})

Deno.test("LookupTable should always have lookup-table class", () => {
	const table1 = LookupTable("Type1")("id1")("value1")
	const table2 = LookupTable("Type2")("id2")("value2")

	assertEquals(table1.attributes.class, "lookup-table")
	assertEquals(table2.attributes.class, "lookup-table")
})

Deno.test("LookupTable should handle complex nested table structures", () => {
	const createComplexTable = LookupTable("Nested")
	const complexData = {
		metadata: {
			version: "1.0",
			created: "2023-01-01",
		},
		tables: {
			users: [
				{ id: 1, name: "Alice", roles: ["admin", "user"] },
				{ id: 2, name: "Bob", roles: ["user"] },
			],
			permissions: {
				admin: ["read", "write", "delete"],
				user: ["read"],
			},
		},
	}

	const result = createComplexTable("complex-table")(complexData)

	assertEquals(result.tag, "Data")
	assertEquals(result.attributes.class, "lookup-table")
	assertEquals(result.attributes.id, "complex-table")
	assertEquals(result.attributes.value, complexData)
	assertEquals(result.dataset.type, "Nested")
})
