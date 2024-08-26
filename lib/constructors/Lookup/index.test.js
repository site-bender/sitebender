import { expect, test } from "vitest"

import Lookup from "./"

test("[Lookup] (constructors) works with all attributes", () => {
	const lookup = Lookup("Integer")("id")("12345")

	expect(lookup).toMatchObject({
		attributes: { class: "lookup", id: "id", value: "12345" },
		dataset: { type: "Integer" },
		tag: "Data",
	})
})

test("[Lookup] (constructors) works with default datatype", () => {
	const lookup = Lookup()("tableOfColors")(
		`[["red","#f00"],["green","#0f0"],["blue","#00f"]]`,
	)

	expect(lookup).toMatchObject({
		attributes: {
			class: "lookup",
			id: "tableOfColors",
			value: '[["red","#f00"],["green","#0f0"],["blue","#00f"]]',
		},
		dataset: {
			type: "Json",
		},
		tag: "Data",
	})
})
