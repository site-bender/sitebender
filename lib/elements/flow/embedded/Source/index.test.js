// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import Source from "."

test("[Source] (constructors::flow::heading) returns <source> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Source({
			grizmo: "gribbet",
			height: 50,
			id: "id",
			src: "src",
			type: "type",
			width: 100,
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<source id="id" height="50" src="src" type="type" width="100">`,
	)

	document.body.innerHTML = ""
})
