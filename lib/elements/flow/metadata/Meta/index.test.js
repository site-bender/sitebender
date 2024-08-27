// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import { HTTP_EQUIV } from "../../../../rendering/constants"
import Meta from "."

test("[Meta] (constructors::flow::metadata) returns <meta> element with supplied attributes", () => {
	renderTo(document.body)(
		Meta({
			charset: "utf-8",
			content: "content",
			grizmo: "gribbet",
			httpEquiv: HTTP_EQUIV.contentSecurityPolicy,
			id: "id",
			media: "screen",
			name: "name",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<meta id="id" charset="utf-8" content="content" http-equiv="content-security-policy" media="screen" name="name">`,
	)

	document.body.innerHTML = ""
})
