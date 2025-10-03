import { assertEquals } from "@std/assert"

import type { NumberLiteralNode } from "../../../parser/types/index.ts"

import enrichNumberLiteral from "./index.ts"

Deno.test("enrichNumberLiteral - adds Number datatype to integer", () => {
	const node: NumberLiteralNode = {
		_tag: "numberLiteral",
		value: 42,
		position: 0,
	}

	const enriched = enrichNumberLiteral(node)

	assertEquals(enriched._tag, "numberLiteral")
	assertEquals(enriched.value, 42)
	assertEquals(enriched.position, 0)
	assertEquals(enriched.datatype, "Number")
})

Deno.test("enrichNumberLiteral - adds Number datatype to decimal", () => {
	const node: NumberLiteralNode = {
		_tag: "numberLiteral",
		value: 3.14159,
		position: 0,
	}

	const enriched = enrichNumberLiteral(node)

	assertEquals(enriched._tag, "numberLiteral")
	assertEquals(enriched.value, 3.14159)
	assertEquals(enriched.datatype, "Number")
})

Deno.test("enrichNumberLiteral - preserves position information", () => {
	const node: NumberLiteralNode = {
		_tag: "numberLiteral",
		value: 123,
		position: 42,
	}

	const enriched = enrichNumberLiteral(node)

	assertEquals(enriched.position, 42)
})
