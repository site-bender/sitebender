// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import Div from "../../elements/flow/miscellaneous/Div"
import Constant from "../../injectors/constructors/Constant"
import FromElement from "../../injectors/constructors/FromElement"
import IsLessThan from "../../operations/comparators/amount/constructors/IsLessThan"
import IsMoreThan from "../../operations/comparators/amount/constructors/IsMoreThan"
import addConditionals from "./"

const dom = new JSDOM(`<!DOCTYPE html>
<input id="input" name="input" value="5">
<div id="outer-div">
  <div id="inner-div">Hi</div>
</div>`)

globalThis.document = dom.window.document

test("[addConditionals] (rendering) works", async () => {
	const component = Div({
		id: "outer-div",
		display: IsMoreThan("Integer")(Constant("Integer")(7))(
			FromElement("Integer")({ name: "nope" }),
		),
	})([
		Div({
			id: "inner-div",
			display: IsLessThan("Integer")(Constant("Integer")(7))(
				FromElement("Integer")({ name: "input" }),
			),
		})(),
	])

	addConditionals(document.body)(component)

	expect(typeof document.__sbDisplayCallbacks?.["input"]?.[0]).toEqual(
		"function",
	)

	await document.__sbDisplayCallbacks?.["input"]?.[0]()

	const innerDiv = document.querySelector("[name=inner-div]")

	expect(innerDiv.tagName).toEqual("SLOT")
})
