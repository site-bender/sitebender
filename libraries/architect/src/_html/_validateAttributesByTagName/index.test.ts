import { assertEquals } from "@std/assert"

import _validateAttributesByTagName from "./index.ts"

Deno.test(
	"_validateAttributesByTagName",
	async function validateAttributesByTagNameTests(t) {
		await t.step(
			"returns empty objects for empty props",
			function returnsEmptyObjects() {
				const result = _validateAttributesByTagName("div")({})

				assertEquals(result, {
					elementAttrs: {},
					dataAttrs: {},
				})
			},
		)

		await t.step(
			"validates known element attributes",
			function validatesKnownAttributes() {
				const result = _validateAttributesByTagName("a")({
					href: "/home",
					target: "_blank",
				})

				assertEquals(result.elementAttrs, {
					href: "/home",
					target: "_blank",
				})
				assertEquals(result.dataAttrs, {})
			},
		)

		await t.step(
			"returns unknown attributes in dataAttrs",
			function returnsUnknownInDataAttrs() {
				const result = _validateAttributesByTagName("div")({
					onClick: "handler",
					customProp: "value",
				})

				assertEquals(result.elementAttrs, {})
				assertEquals(result.dataAttrs, {
					onClick: "handler",
					customProp: "value",
				})
			},
		)

		await t.step(
			"handles elements with no specific attributes",
			function handlesNoSpecificAttrs() {
				const result = _validateAttributesByTagName("unknown")({
					test: "value",
				})

				assertEquals(result.elementAttrs, {})
				assertEquals(result.dataAttrs, {
					test: "value",
				})
			},
		)

		await t.step(
			"marks non-string values as bad",
			function marksNonStringAsBad() {
				const result = _validateAttributesByTagName("button")({
					type: "submit",
					disabled: true,
				})

				assertEquals(result.elementAttrs, {
					type: "submit",
					"data-§-bad-disabled": "true",
				})
			},
		)

		await t.step(
			"separates element and unknown attributes",
			function separatesAttributes() {
				const result = _validateAttributesByTagName("img")({
					src: "/image.png",
					alt: "Description",
					onClick: "handler",
					customProp: "value",
				})

				assertEquals(result.elementAttrs, {
					src: "/image.png",
					alt: "Description",
				})
				assertEquals(result.dataAttrs, {
					onClick: "handler",
					customProp: "value",
				})
			},
		)
	},
)
