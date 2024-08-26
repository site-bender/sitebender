// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Obj from "."

test("[Obj] (constructors::flow::heading) returns <object> when supplied a string", () => {
	const content = "Checking the content!"

	render(document.body)(Obj()([TextNode(content)]))()

	const object = document.body.querySelector("object")

	expect(object?.id).toBeDefined()
	expect(object?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[Obj] (constructors::flow::heading) returns <object> element with supplied attributes and children", () => {
	const content = "Checking the content!"

	render(document.body)(
		Obj({
			data: "data",
			form: "formId",
			grizmo: "gribbet",
			height: 50,
			id: "id",
			name: "name",
			type: "type",
			width: 100,
		})([TextNode(content)]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<object id="id" data="data" form="formId" height="50" name="name" type="type" width="100">Checking the content!</object>`,
	)

	document.body.innerHTML = ""
})
