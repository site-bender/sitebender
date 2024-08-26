// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import { CROSS_ORIGINS, PRELOADS } from "../../../../rendering/constants"
import TextNode from "../../../TextNode"
import Audio from "."

test("[Audio] (constructors::flow::heading) returns <audio> when supplied a string", () => {
	const content = "Checking the content!"

	render(document.body)(Audio()([TextNode(content)]))()

	const audio = document.body.querySelector("audio")

	expect(audio?.id).toBeDefined()
	expect(audio?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[Audio] (constructors::flow::heading) returns <audio> element with supplied attributes and children", () => {
	const content = "Checking the content!"

	render(document.body)(
		Audio({
			autoplay: true,
			controls: true,
			crossOrigin: CROSS_ORIGINS.anonymous,
			grizmo: "gribbet",
			id: "id",
			loop: true,
			muted: true,
			preload: PRELOADS.auto,
			src: "src",
		})([TextNode(content)]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<audio id="id" autoplay="" controls="" loop="" muted="" src="src">Checking the content!</audio>`,
	)

	document.body.innerHTML = ""
})
