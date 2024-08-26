import { expect, test } from "vitest"

import LookupTable from "./"

test("[LookupTable] (constructors) works with all attributes", () => {
	const lookup = LookupTable("Array")("id")("[1,2,3,4,5]")

	expect(lookup).toMatchObject({
		attributes: { class: "lookup-table", id: "id", value: "[1,2,3,4,5]" },
		dataset: { type: "Array" },
		tag: "Data",
	})
})

test("[LookupTable] (constructors) works with default datatype", () => {
	const lookup = LookupTable()("tableOfColors")(
		`[["red","#f00"],["green","#0f0"],["blue","#00f"]]`,
	)

	expect(lookup).toMatchObject({
		attributes: {
			class: "lookup-table",
			id: "tableOfColors",
			value: '[["red","#f00"],["green","#0f0"],["blue","#00f"]]',
		},
		dataset: {
			type: "Json",
		},
		tag: "Data",
	})
})
