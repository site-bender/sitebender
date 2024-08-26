// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import Input from "./"

test(`[Input] (constructors::flow::interactive) returns a <input type="week">`, () => {
	render(document.body)(Input()()({ id: "id" }))()

	const week = document.body.querySelector("input")

	expect(week?.id).toBeDefined()
	expect(week?.type).toEqual("text")

	document.body.innerHTML = ""
})
