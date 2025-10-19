import { assertEquals } from "@std/assert"
import type {
	TsMethodSignature,
	TsPropertySignature,
	TsTypeElement,
} from "../../../types/index.ts"
import _serializeMembers from "./index.ts"

Deno.test("_serializeMembers", async function tests(t) {
	await t.step("accumulates property signature", function () {
		const accumulator: ReadonlyArray<string> = []
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "name" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
			optional: false,
			readonly: false,
		}

		const result = _serializeMembers(accumulator, member)

		assertEquals(result, ["name: string"])
	})

	await t.step("accumulates method signature", function () {
		const accumulator: ReadonlyArray<string> = []
		const member: TsMethodSignature = {
			type: "TsMethodSignature",
			key: { value: "toString" },
			params: [],
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
		}

		const result = _serializeMembers(accumulator, member)

		assertEquals(result, ["toString(): string"])
	})

	await t.step("appends to existing accumulator", function () {
		const accumulator: ReadonlyArray<string> = [
			"id: string",
			"age: number",
		]
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "active" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "boolean",
				},
			},
			optional: false,
			readonly: false,
		}

		const result = _serializeMembers(accumulator, member)

		assertEquals(result, ["id: string", "age: number", "active: boolean"])
	})

	await t.step("filters out empty serialization", function () {
		const accumulator: ReadonlyArray<string> = ["id: string"]
		const member = {
			type: "UnknownType",
			key: { value: "weird" },
		} as unknown as TsTypeElement

		const result = _serializeMembers(accumulator, member)

		// Empty string from _serializeMember should not be added
		assertEquals(result, ["id: string"])
	})

	await t.step("preserves immutability of accumulator", function () {
		const accumulator: ReadonlyArray<string> = ["existing: string"]
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "new" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "number",
				},
			},
			optional: false,
			readonly: false,
		}

		const result = _serializeMembers(accumulator, member)

		// Original accumulator unchanged
		assertEquals(accumulator, ["existing: string"])
		// Result is new array
		assertEquals(result, ["existing: string", "new: number"])
		// Different references
		assertEquals(accumulator === result, false)
	})

	await t.step("handles optional property", function () {
		const accumulator: ReadonlyArray<string> = []
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "email" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
			optional: true,
			readonly: false,
		}

		const result = _serializeMembers(accumulator, member)

		assertEquals(result, ["email?: string"])
	})

	await t.step("handles readonly property", function () {
		const accumulator: ReadonlyArray<string> = []
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "id" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
			optional: false,
			readonly: true,
		}

		const result = _serializeMembers(accumulator, member)

		assertEquals(result, ["readonly id: string"])
	})

	await t.step("handles method with parameters", function () {
		const accumulator: ReadonlyArray<string> = []
		const member: TsMethodSignature = {
			type: "TsMethodSignature",
			key: { value: "add" },
			params: [
				{
					pat: { value: "augend" },
					typeAnnotation: {
						typeAnnotation: {
							type: "TsKeywordType",
							kind: "number",
						},
					},
				},
				{
					pat: { value: "addend" },
					typeAnnotation: {
						typeAnnotation: {
							type: "TsKeywordType",
							kind: "number",
						},
					},
				},
			],
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "number",
				},
			},
		}

		const result = _serializeMembers(accumulator, member)

		assertEquals(result, ["add(augend: number, addend: number): number"])
	})

	await t.step("handles empty accumulator", function () {
		const accumulator: ReadonlyArray<string> = []
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "first" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "number",
				},
			},
			optional: false,
			readonly: false,
		}

		const result = _serializeMembers(accumulator, member)

		assertEquals(result, ["first: number"])
	})

	await t.step(
		"maintains order when accumulating multiple times",
		function () {
			const members: ReadonlyArray<TsTypeElement> = [
				{
					type: "TsPropertySignature",
					key: { value: "id" },
					typeAnnotation: {
						typeAnnotation: { type: "TsKeywordType", kind: "string" },
					},
					optional: false,
					readonly: true,
				},
				{
					type: "TsPropertySignature",
					key: { value: "name" },
					typeAnnotation: {
						typeAnnotation: { type: "TsKeywordType", kind: "string" },
					},
					optional: false,
					readonly: false,
				},
				{
					type: "TsMethodSignature",
					key: { value: "toString" },
					params: [],
					typeAnnotation: {
						typeAnnotation: { type: "TsKeywordType", kind: "string" },
					},
				},
			]

			// Simulate reduce operation
			let accumulator: ReadonlyArray<string> = []
			for (const member of members) {
				accumulator = _serializeMembers(accumulator, member)
			}

			assertEquals(accumulator, [
				"readonly id: string",
				"name: string",
				"toString(): string",
			])
		},
	)

	await t.step("works as reducer function with array.reduce", function () {
		const members: ReadonlyArray<TsTypeElement> = [
			{
				type: "TsPropertySignature",
				key: { value: "x" },
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "number" },
				},
				optional: false,
				readonly: false,
			},
			{
				type: "TsPropertySignature",
				key: { value: "y" },
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "number" },
				},
				optional: false,
				readonly: false,
			},
			{
				type: "TsMethodSignature",
				key: { value: "distance" },
				params: [],
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "number" },
				},
			},
		]

		const result = members.reduce(_serializeMembers, [])

		assertEquals(result, [
			"x: number",
			"y: number",
			"distance(): number",
		])
	})

	await t.step(
		"filters multiple empty serializations in sequence",
		function () {
			const members: ReadonlyArray<TsTypeElement> = [
				{
					type: "TsPropertySignature",
					key: { value: "valid" },
					typeAnnotation: {
						typeAnnotation: { type: "TsKeywordType", kind: "string" },
					},
					optional: false,
					readonly: false,
				},
				{
					type: "UnknownType",
					key: { value: "invalid1" },
				} as unknown as TsTypeElement,
				{
					type: "UnknownType",
					key: { value: "invalid2" },
				} as unknown as TsTypeElement,
				{
					type: "TsPropertySignature",
					key: { value: "alsoValid" },
					typeAnnotation: {
						typeAnnotation: { type: "TsKeywordType", kind: "number" },
					},
					optional: false,
					readonly: false,
				},
			]

			const result = members.reduce(_serializeMembers, [])

			// Only valid serializations included
			assertEquals(result, ["valid: string", "alsoValid: number"])
		},
	)

	await t.step("handles complex interface with mixed members", function () {
		const members: ReadonlyArray<TsTypeElement> = [
			{
				type: "TsPropertySignature",
				key: { value: "readonly id" },
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "string" },
				},
				optional: false,
				readonly: true,
			},
			{
				type: "TsPropertySignature",
				key: { value: "name" },
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "string" },
				},
				optional: false,
				readonly: false,
			},
			{
				type: "TsPropertySignature",
				key: { value: "age" },
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "number" },
				},
				optional: true,
				readonly: false,
			},
			{
				type: "TsMethodSignature",
				key: { value: "greet" },
				params: [
					{
						pat: { value: "greeting" },
						typeAnnotation: {
							typeAnnotation: { type: "TsKeywordType", kind: "string" },
						},
					},
				],
				typeAnnotation: {
					typeAnnotation: { type: "TsKeywordType", kind: "string" },
				},
			},
			{
				type: "TsMethodSignature",
				key: { value: "incrementAge" },
				params: [],
			},
		]

		const result = members.reduce(_serializeMembers, [])

		assertEquals(result, [
			"readonly readonly id: string",
			"name: string",
			"age?: number",
			"greet(greeting: string): string",
			"incrementAge(): void",
		])
	})

	await t.step(
		"preserves accumulator when all members are invalid",
		function () {
			const accumulator: ReadonlyArray<string> = ["existing: string"]
			const members: ReadonlyArray<TsTypeElement> = [
				{
					type: "UnknownType",
					key: { value: "invalid1" },
				} as unknown as TsTypeElement,
				{
					type: "UnknownType",
					key: { value: "invalid2" },
				} as unknown as TsTypeElement,
			]

			const result = members.reduce(_serializeMembers, accumulator)

			// Accumulator unchanged because all members were invalid
			assertEquals(result, ["existing: string"])
		},
	)
})
