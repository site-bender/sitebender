import { assertEquals } from "@std/assert"

import type { VariableNode } from "../../../parser/types/index.ts"

import enrichVariable from "./index.ts"

Deno.test("enrichVariable - adds default Number datatype to regular variable", () => {
	const node: VariableNode = {
		_tag: "variable",
		name: "x",
		position: 0,
	}

	const enriched = enrichVariable(node)

	assertEquals(enriched._tag, "variable")
	assertEquals(enriched.name, "x")
	assertEquals(enriched.position, 0)
	assertEquals(enriched.datatype, "Number")
})

Deno.test("enrichVariable - recognizes π as Number constant", () => {
	const node: VariableNode = {
		_tag: "variable",
		name: "π",
		position: 4,
	}

	const enriched = enrichVariable(node)

	assertEquals(enriched._tag, "variable")
	assertEquals(enriched.name, "π")
	assertEquals(enriched.datatype, "Number")
})

Deno.test("enrichVariable - recognizes e as Number constant", () => {
	const node: VariableNode = {
		_tag: "variable",
		name: "e",
		position: 0,
	}

	const enriched = enrichVariable(node)

	assertEquals(enriched.name, "e")
	assertEquals(enriched.datatype, "Number")
})

Deno.test("enrichVariable - handles camelCase variable names", () => {
	const node: VariableNode = {
		_tag: "variable",
		name: "numberOfBoyfriends",
		position: 10,
	}

	const enriched = enrichVariable(node)

	assertEquals(enriched.name, "numberOfBoyfriends")
	assertEquals(enriched.datatype, "Number")
	assertEquals(enriched.position, 10)
})
