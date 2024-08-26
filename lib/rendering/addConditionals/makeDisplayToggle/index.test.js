// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import FromArgument from "../../../injectors/constructors/FromArgument"
import composeConditional from "../../../operations/composers/composeConditional"
import makeDisplayToggle from "./"

const dom = new JSDOM(`<!DOCTYPE html>
<html>
	<head><title>Test</title></head>
	<body><div id="moveMe">5000</div></body>
</html>
`)

globalThis.document = dom.window.document

test("[makeDisplayToggle] (rendering::addConditionals) returns the toggle function which shows and hides the element", async () => {
	const toggle = makeDisplayToggle("moveMe")(
		composeConditional(FromArgument("Boolean")),
	)

	await toggle(false)

	expect(document.body.innerHTML.trim()).toEqual(`<slot name="moveMe"></slot>`)

	await toggle(true)

	expect(document.body.innerHTML.trim()).toEqual(`<div id="moveMe">5000</div>`)
})
