// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import { SHAPE } from "../../../../rendering/constants"
import Area from "../Area"
import Map from "."

test("[Map] (constructors::flow::miscellaneous) returns a blank <map> element with id", () => {
	render(document.body)(Map()())()

	const map = document.body.querySelector("map")

	expect(map?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Map] (constructors::flow::miscellaneous) returns <map> element with supplied attributes and children", () => {
	render(document.body)(
		Map({
			cite: "cite",
			dataset: {
				name: "Bob",
			},
			datetime: "Right now",
			grizmo: "gribbet",
			id: "id",
		})([
			Area({
				coords: "110,150,75,36,29,92,105",
				id: "area-id",
				shape: SHAPE.poly,
			}),
		]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<map id="id" data-name="Bob"><area id="area-id" ` +
			`coords="110,150,75,36,29,92,105" shape="poly"></map>`,
	)

	document.body.innerHTML = ""
})
