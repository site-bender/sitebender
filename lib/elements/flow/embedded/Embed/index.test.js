// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import Embed from "."

test("[Embed] (constructors::flow::heading) returns <embed> element with supplied attributes and children", () => {
	render(document.body)(
		Embed({
			height: 50,
			grizmo: "gribbet",
			id: "id",
			src: "src",
			type: "type",
			width: 100,
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<embed id="id" height="50" src="src" type="type" width="100">`,
	)

	document.body.innerHTML = ""
})