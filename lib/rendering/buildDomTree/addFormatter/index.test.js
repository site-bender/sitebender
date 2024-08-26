// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import AsMonetaryAmount from "../../../format/constructors/AsMonetaryAmount"
import FromArgument from "../../../injectors/constructors/FromArgument"
import FromElement from "../../../injectors/constructors/FromElement"
import addFormatter from "./"

const dom = new JSDOM(`<!DOCTYPE html>
  <input name="test" value="1000000">
	<div id="inner">5000</div>
`)

globalThis.document = dom.window.document

test("[addFormatter] (rendering::buildDomTree) works with value elements", async () => {
	const elem = document.querySelector("[name=test]")

	addFormatter(elem)(AsMonetaryAmount()()(FromElement()({ name: "test" })))

	expect(elem.__sbFormat).toBeTypeOf("function")
	expect(await elem.__sbFormat()).toMatchObject({ right: "$1,000,000.00" })
})

test("[addFormatter] (rendering::buildDomTree) works with innerHTML elements", async () => {
	const elem = document.querySelector("#inner")

	addFormatter(elem)(AsMonetaryAmount()()(FromArgument()))

	expect(elem.__sbFormat).toBeTypeOf("function")
	expect(await elem.__sbFormat()).toMatchObject({ right: "$5,000.00" })

	// console.log("__sbFormatted", document.__sbFormatted)
	// console.log(elem.dataset.format)
})
