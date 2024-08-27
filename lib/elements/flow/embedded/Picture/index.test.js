// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import Img from "../Img"
import Source from "../Source"
import Picture from "."

test("[Picture] (constructors::flow::heading) returns <picture> when supplied a string", () => {
	renderTo(document.body)(Picture()())()

	const picture = document.body.querySelector("picture")

	expect(picture?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Picture] (constructors::flow::heading) returns <picture> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Picture({
			grizmo: "gribbet",
			id: "id",
		})([
			Source({ id: "source-1" }),
			Source({ id: "source-2" }),
			Img({ id: "img" }),
		]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<picture id="id"><source id="source-1"><source id="source-2"><img id="img"></picture>`,
	)

	document.body.innerHTML = ""
})
