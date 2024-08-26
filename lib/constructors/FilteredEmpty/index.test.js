import { expect, test } from "vitest"

import FilteredEmpty from "./"

test("[FilteredEmpty] (constructors) works with all attributes", () => {
	const filteredEmpty = FilteredEmpty("Br")()

	expect(
		filteredEmpty({
			calculation: "calculation",
			dataset: "dataset",
			display: "display",
			scripts: "scripts",
			stylesheets: "stylesheets",
			id: "id",
		}),
	).toMatchObject({
		attributes: {
			id: "id",
		},
		calculation: "calculation",
		dataset: "dataset",
		display: "display",
		scripts: "scripts",
		stylesheets: "stylesheets",
		tag: "Br",
	})
})

test("[FilteredEmpty] (constructors) works with no attributes", () => {
	const filteredEmpty = FilteredEmpty("Br")(a => a)

	expect(filteredEmpty()).toMatchObject({
		attributes: {},
		tag: "Br",
	})
})
