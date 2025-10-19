import { assertEquals } from "@std/assert"
import type { SwcFnParam } from "../../../../types/index.ts"
import _serializeParameters from "./index.ts"

Deno.test("_serializeParameters", async function tests(t) {
	await t.step("accumulates parameter with type annotation", function () {
		const accumulator: ReadonlyArray<string> = []
		const param: SwcFnParam = {
			pat: { value: "name" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
		}

		const result = _serializeParameters(accumulator, param)

		assertEquals(result, ["name: string"])
	})

	await t.step("accumulates parameter without type annotation", function () {
		const accumulator: ReadonlyArray<string> = []
		const param: SwcFnParam = {
			pat: { value: "value" },
		}

		const result = _serializeParameters(accumulator, param)

		assertEquals(result, ["value"])
	})

	await t.step(
		"appends to existing accumulator with type annotation",
		function () {
			const accumulator: ReadonlyArray<string> = [
				"first: number",
				"second: boolean",
			]
			const param: SwcFnParam = {
				pat: { value: "third" },
				typeAnnotation: {
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "string",
					},
				},
			}

			const result = _serializeParameters(accumulator, param)

			assertEquals(result, [
				"first: number",
				"second: boolean",
				"third: string",
			])
		},
	)

	await t.step(
		"appends to existing accumulator without type annotation",
		function () {
			const accumulator: ReadonlyArray<string> = ["first: number"]
			const param: SwcFnParam = {
				pat: { value: "second" },
			}

			const result = _serializeParameters(accumulator, param)

			assertEquals(result, ["first: number", "second"])
		},
	)

	await t.step("preserves immutability of accumulator", function () {
		const accumulator: ReadonlyArray<string> = ["existing: string"]
		const param: SwcFnParam = {
			pat: { value: "new" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "number",
				},
			},
		}

		const result = _serializeParameters(accumulator, param)

		// Original accumulator unchanged
		assertEquals(accumulator, ["existing: string"])
		// Result is new array
		assertEquals(result, ["existing: string", "new: number"])
		// Different references
		assertEquals(accumulator === result, false)
	})

	await t.step("handles complex type annotation", function () {
		const accumulator: ReadonlyArray<string> = []
		const param: SwcFnParam = {
			pat: { value: "callback" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsFunctionType",
					params: [],
					typeAnnotation: {
						typeAnnotation: {
							type: "TsKeywordType",
							kind: "void",
						},
					},
				},
			},
		}

		const result = _serializeParameters(accumulator, param)

		// The exact serialization depends on _serializeParameter implementation
		// We just verify it's added to the accumulator
		assertEquals(result.length, 1)
		assertEquals(result[0].startsWith("callback:"), true)
	})

	await t.step("handles empty accumulator", function () {
		const accumulator: ReadonlyArray<string> = []
		const param: SwcFnParam = {
			pat: { value: "first" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "number",
				},
			},
		}

		const result = _serializeParameters(accumulator, param)

		assertEquals(result, ["first: number"])
	})

	await t.step("handles parameter names with special characters", function () {
		const accumulator: ReadonlyArray<string> = []
		const param: SwcFnParam = {
			pat: { value: "_privateThing" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
		}

		const result = _serializeParameters(accumulator, param)

		assertEquals(result, ["_privateThing: string"])
	})

	await t.step("maintains order when accumulating multiple times", function () {
		const params: ReadonlyArray<SwcFnParam> = [
			{
				pat: { value: "first" },
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "string" },
				},
			},
			{
				pat: { value: "second" },
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "number" },
				},
			},
			{
				pat: { value: "third" },
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "boolean" },
				},
			},
		]

		// Simulate reduce operation
		let accumulator: ReadonlyArray<string> = []
		for (const param of params) {
			accumulator = _serializeParameters(accumulator, param)
		}

		assertEquals(accumulator, [
			"first: string",
			"second: number",
			"third: boolean",
		])
	})

	await t.step("works as reducer function with array.reduce", function () {
		const params: ReadonlyArray<SwcFnParam> = [
			{
				pat: { value: "a" },
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "number" },
				},
			},
			{
				pat: { value: "b" },
			},
			{
				pat: { value: "c" },
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "string" },
				},
			},
		]

		const result = params.reduce(_serializeParameters, [])

		assertEquals(result, ["a: number", "b", "c: string"])
	})
})
