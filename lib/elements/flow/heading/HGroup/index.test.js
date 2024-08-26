// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import H1 from "../H1"
import H2 from "../H2"
import HGroup from "."

test("[HGroup] (constructors::flow::heading) returns <hgroup> element with generated ID", () => {
	render(document.body)(HGroup()())()

	const hgroup = document.body.querySelector("hgroup")

	expect(hgroup?.id).toBeDefined()
	expect(hgroup?.tagName).toEqual("HGROUP")

	document.body.innerHTML = ""
})

test("[HGroup] (constructors::flow::heading) returns HGroup with supplied children", () => {
	render(document.body)(
		HGroup({
			id: "hgroup-id",
		})([H1({ id: "h1-id" })("One"), H2({ id: "h2-id" })("Two")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<hgroup id="hgroup-id"><h1 id="h1-id">One</h1><h2 id="h2-id">Two</h2></hgroup>',
	)

	document.body.innerHTML = ""
})

test("[HGroup] (constructors::flow::heading) ignores incorrect attributes", () => {
	render(document.body)(
		HGroup({
			dataset: {
				gribbet: "gribbet",
			},
			id: "id",
			grizmo: "grizmo",
		})([H1({ id: "h1-id" })("One"), H2({ id: "h2-id" })("Two")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<hgroup id="id" data-gribbet="gribbet"><h1 id="h1-id">One</h1><h2 id="h2-id">Two</h2></hgroup>',
	)

	document.body.innerHTML = ""
})
