// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import { CROSS_ORIGINS, PRELOADS } from "../../../../rendering/constants"
import TextNode from "../../../TextNode"
import Video from "."

test("[Video] (constructors::flow::heading) returns <video> element", () => {
	renderTo(document.body)(Video()())()

	const video = document.body.querySelector("video")

	expect(video?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Video] (constructors::flow::heading) returns <video> element with supplied attributes and children", () => {
	const content = "Checking the content!"

	renderTo(document.body)(
		Video({
			autoplay: true,
			controls: true,
			crossOrigin: CROSS_ORIGINS.anonymous,
			grizmo: "gribbet",
			height: 50,
			id: "id",
			loop: true,
			muted: true,
			playsInline: true,
			poster: "poster",
			preload: PRELOADS.auto,
			src: "src",
			width: 100,
		})([TextNode(content)]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<video id="id" autoplay="" controls="" height="50" loop="" muted="" playsinline="" poster="poster" src="src" width="100">Checking the content!</video>`,
	)

	document.body.innerHTML = ""
})
