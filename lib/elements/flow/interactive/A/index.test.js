// @vitest-environment jsdom

import { expect, test } from "vitest"

import {
	FORM_TARGETS,
	REFERRER_POLICIES,
	RELS_FOR_AREA,
} from "../../../../rendering/constants"
import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import A from "."

test("[A] (constructors::flow::interactive) returns a <a> with text content", () => {
	const content = "Checking the content!"

	renderTo(document.body)(A()(TextNode(content)))()

	const a = document.body.querySelector("a")

	expect(a?.id).toBeDefined()
	expect(a?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[A] (constructors::flow::interactive) returns <a> element with supplied attributes and children", () => {
	renderTo(document.body)(
		A({
			download: "download",
			grizmo: "gribbet",
			href: "href",
			hreflang: "en-US",
			id: "id",
			ping: "ping",
			referrerPolicy: REFERRER_POLICIES.strictOrigin,
			rel: RELS_FOR_AREA.author,
			target: FORM_TARGETS._unfencedTop,
			type: "mime-type",
		})(),
	)()

	expect(document.body.innerHTML).toEqual(
		`<a id="id" download="download" href="href" hreflang="en-US" ping="ping" type="mime-type"></a>`,
	)

	document.body.innerHTML = ""
})
