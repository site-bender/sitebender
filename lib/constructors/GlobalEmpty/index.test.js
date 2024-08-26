import { expect, test } from "vitest"

import GlobalEmpty from "./"

test("[GlobalEmpty] (constructors) works with all attributes", () => {
	const globalEmpty = GlobalEmpty("Hr")

	expect(
		globalEmpty({
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
		tag: "Hr",
	})
})

test("[GlobalEmpty] (constructors) works with no attributes", () => {
	const globalEmpty = GlobalEmpty("Hr")
	const config = globalEmpty()

	expect(config).toMatchObject({
		attributes: {},
		tag: "Hr",
	})

	expect(config.attributes.id).toBeDefined()
})
