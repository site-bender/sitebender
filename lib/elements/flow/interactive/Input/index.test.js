// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import Input from "./"

test(`[Input] (constructors::flow::interactive) returns a <input type="week">`, () => {
	renderTo(document.body)(Input()()({ id: "id" }))()

	const week = document.body.querySelector("input")

	expect(week?.id).toBeDefined()
	expect(week?.type).toEqual("text")

	document.body.innerHTML = ""
})
