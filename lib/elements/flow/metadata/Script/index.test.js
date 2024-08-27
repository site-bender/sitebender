// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import {
	BLOCKING,
	CROSS_ORIGIN,
	FETCH_PRIORITY,
	REFERRER_POLICY,
} from "../../../../rendering/constants"
import TextNode from "../../../TextNode"
import Script from "."

test("[Script] (constructors::flow::metadata) returns <script> without attributes or content", () => {
	renderTo(document.body)(Script()())()

	const script = document.body.querySelector("script")

	expect(script?.id).toBeDefined()
	expect(script?.getAttribute("type")).toEqual("module")

	document.body.innerHTML = ""
})

test("[Script] (constructors::flow::metadata) returns <script> element with attributes and content", () => {
	renderTo(document.body)(
		Script({
			async: true,
			blocking: BLOCKING.render,
			crossOrigin: CROSS_ORIGIN.anonymous,
			defer: true,
			fetchPriority: FETCH_PRIORITY.low,
			grizmo: "gribbet",
			id: "id",
			integrity: "integrity",
			noModule: true,
			referrerPolicy: REFERRER_POLICY.origin,
			src: "src",
			type: "importmap",
		})([TextNode("Content")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<script id="id" type="importmap" async="" blocking="render" ` +
			`crossorigin="anonymous" defer="" fetchpriority="low" ` +
			`integrity="integrity" nomodule="" referrerpolicy="origin" ` +
			`src="src">Content</script>`,
	)

	document.body.innerHTML = ""
})
