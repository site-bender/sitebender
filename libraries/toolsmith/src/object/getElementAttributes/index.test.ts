import type { ElementNode } from "../../types/index.ts"

import { assertEquals } from "@std/assert"
import { assert } from "@std/assert/assert"

import getElementAttributes from "./index.ts"

Deno.test(
	"getElementAttributes",
	async function getElementAttributesTests(t) {
		await t.step(
			"returns ok with attributes for valid ElementNode",
			function returnsOkWithAttributes() {
				const node: ElementNode = {
					_tag: "element",
					tagName: "DIV",
					attributes: { id: "test", class: "container" },
					children: [],
				}

				const result = getElementAttributes(node)

				assert(result._tag === "Ok")
				if (result._tag === "Ok") {
					assertEquals(result.value, { id: "test", class: "container" })
				}
			},
		)

		await t.step(
			"returns ok for empty attributes object",
			function worksWithEmptyAttributes() {
				const node: ElementNode = {
					_tag: "element",
					tagName: "DIV",
					attributes: {},
					children: [],
				}

				const result = getElementAttributes(node)

				assert(result._tag === "Ok")
				if (result._tag === "Ok") {
					assertEquals(result.value, {})
				}
			},
		)

		await t.step(
			"returns error for non-ElementNode",
			function returnsErrorForNonElementNode() {
				const node = {
					_tag: "text",
					content: "hello",
				} as unknown as ElementNode

				const result = getElementAttributes(node)

				assert(result._tag === "Error")
				if (result._tag === "Error") {
					assertEquals(result.error.code, "INVALID_ELEMENT_NODE")
				}
			},
		)

		await t.step(
			"returns error for node missing attributes",
			function returnsErrorForMissingAttributes() {
				const node = {
					_tag: "element",
					tagName: "DIV",
					children: [],
				} as unknown as ElementNode

				const result = getElementAttributes(node)

				assert(result._tag === "Error")
				if (result._tag === "Error") {
					assertEquals(result.error.code, "MISSING_ATTRIBUTES")
				}
			},
		)

		await t.step(
			"returns error for non-object attributes",
			function returnsErrorForNonObjectAttributes() {
				const node = {
					_tag: "element",
					tagName: "DIV",
					attributes: "not an object",
					children: [],
				} as unknown as ElementNode

				const result = getElementAttributes(node)

				assert(result._tag === "Error")
				if (result._tag === "Error") {
					assertEquals(result.error.code, "INVALID_ATTRIBUTES_TYPE")
				}
			},
		)

		await t.step(
			"returns error for null attributes",
			function returnsErrorForNullAttributes() {
				const node = {
					_tag: "element",
					tagName: "DIV",
					attributes: null,
					children: [],
				} as unknown as ElementNode

				const result = getElementAttributes(node)

				assert(result._tag === "Error")
				if (result._tag === "Error") {
					assertEquals(result.error.code, "INVALID_ATTRIBUTES_TYPE")
				}
			},
		)

		await t.step(
			"returns error for array attributes",
			function returnsErrorForArrayAttributes() {
				const node = {
					_tag: "element",
					tagName: "DIV",
					attributes: ["not", "object"],
					children: [],
				} as unknown as ElementNode

				const result = getElementAttributes(node)

				assert(result._tag === "Error")
				if (result._tag === "Error") {
					assertEquals(result.error.code, "ATTRIBUTES_IS_ARRAY")
				}
			},
		)

		await t.step(
			"protects against type assertion bypasses",
			function protectsAgainstTypeAssertions() {
				const node = {} as ElementNode

				const result = getElementAttributes(node)

				assert(result._tag === "Error")
			},
		)
	},
)
