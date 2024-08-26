// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import convertSelectorsToIds from "./"

const dom = new JSDOM(`<!DOCTYPE html>
<html>
  <head></head>
	<body>
		<div data-value="w" id="div1"></div>
		<div data-value="x" id="div2"></div>
		<div data-value="y" id="div3"></div>
		<div data-value="z" id="div4"></div>
	</body>
</html>
`)

globalThis.document = dom.window.document

const f = i => i

test("[convertSelectorsToIds] (rendering) works", async () => {
	document.__sbCalculations = {
		"div[data-value=w]": f,
		"div[data-value=x]": f,
		"div[data-value=y]": f,
		"div[data-value=z]": f,
	}

	convertSelectorsToIds()

	expect(document.__sbCalculations).toMatchObject({
		div1: f,
		div2: f,
		div3: f,
		div4: f,
	})
})

test("[convertSelectorsToIds] (rendering) works", async () => {
	document.__sbCalculations = undefined

	convertSelectorsToIds()

	expect(document.__sbCalculations).toMatchObject({})
})
