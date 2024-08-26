// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import moveElementToDisplayCache from "../moveElementToDisplayCache"
import replaceElementFromDisplayCache from "./"

const dom = new JSDOM(`<!DOCTYPE html>
<html>
	<head><title>Test</title></head>
	<body><div id="moveMe">5000</div></body>
</html>
`)

globalThis.document = dom.window.document

test("[replaceElementFromDisplayCache] (rendering::addConditionals::makeDisplayToggle) works with value elements", async () => {
	moveElementToDisplayCache("moveMe")

	expect(document.body.innerHTML.trim()).toMatchObject(
		`<slot name="moveMe"></slot>`,
	)
	expect(document.__sbDisplayCache.moveMe).toBeDefined()

	replaceElementFromDisplayCache("moveMe")

	expect(document.body.innerHTML.trim()).toMatchObject(
		`<div id="moveMe">5000</div>`,
	)
})
