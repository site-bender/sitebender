import { assertEquals } from "@std/assert"
import type {
	TsMethodSignature,
	TsPropertySignature,
	TsTypeElement,
} from "../../../types/index.ts"
import _serializeMember from "./index.ts"

Deno.test("_serializeMember", async function tests(t) {
	await t.step("serializes property signature with type", function () {
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

		const result = _serializeMember(member)

		assertEquals(result, "name: string")
	})

	await t.step("serializes optional property signature", function () {
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "age" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "number",
				},
			},
			optional: true,
			readonly: false,
		}

		const result = _serializeMember(member)

		assertEquals(result, "age?: number")
	})

	await t.step("serializes readonly property signature", function () {
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

		const result = _serializeMember(member)

		assertEquals(result, "readonly id: string")
	})

	await t.step("serializes readonly optional property", function () {
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "metadata" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "object",
				},
			},
			optional: true,
			readonly: true,
		}

		const result = _serializeMember(member)

		assertEquals(result, "readonly metadata?: object")
	})

	await t.step("serializes property without type annotation", function () {
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "value" },
			optional: false,
			readonly: false,
		}

		const result = _serializeMember(member)

		assertEquals(result, "value")
	})

	await t.step("serializes method signature with no parameters", function () {
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

		const result = _serializeMember(member)

		assertEquals(result, "toString(): string")
	})

	await t.step("serializes method signature with one parameter", function () {
		const member: TsMethodSignature = {
			type: "TsMethodSignature",
			key: { value: "getId" },
			params: [
				{
					pat: { value: "prefix" },
					typeAnnotation: {
						typeAnnotation: {
							type: "TsKeywordType",
							kind: "string",
						},
					},
				},
			],
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
		}

		const result = _serializeMember(member)

		assertEquals(result, "getId(prefix: string): string")
	})

	await t.step(
		"serializes method signature with multiple parameters",
		function () {
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

			const result = _serializeMember(member)

			assertEquals(result, "add(augend: number, addend: number): number")
		},
	)

	await t.step(
		"serializes method signature without return type annotation",
		function () {
			const member: TsMethodSignature = {
				type: "TsMethodSignature",
				key: { value: "process" },
				params: [],
			}

			const result = _serializeMember(member)

			assertEquals(result, "process(): void")
		},
	)

	await t.step(
		"serializes method with parameters but no return type",
		function () {
			const member: TsMethodSignature = {
				type: "TsMethodSignature",
				key: { value: "setName" },
				params: [
					{
						pat: { value: "name" },
						typeAnnotation: {
							typeAnnotation: {
								type: "TsKeywordType",
								kind: "string",
							},
						},
					},
				],
			}

			const result = _serializeMember(member)

			assertEquals(result, "setName(name: string): void")
		},
	)

	await t.step("serializes method with untyped parameters", function () {
		const member: TsMethodSignature = {
			type: "TsMethodSignature",
			key: { value: "execute" },
			params: [
				{
					pat: { value: "arg1" },
				},
				{
					pat: { value: "arg2" },
				},
			],
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "void",
				},
			},
		}

		const result = _serializeMember(member)

		assertEquals(result, "execute(arg1, arg2): void")
	})

	await t.step("serializes property with complex union type", function () {
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "status" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsUnionType",
					types: [
						{
							type: "TsLiteralType",
							literal: {
								type: "StringLiteral",
								value: "active",
							},
						},
						{
							type: "TsLiteralType",
							literal: {
								type: "StringLiteral",
								value: "inactive",
							},
						},
					],
				},
			},
			optional: false,
			readonly: false,
		}

		const result = _serializeMember(member)

		assertEquals(result, 'status: "active" | "inactive"')
	})

	await t.step("serializes property with array type", function () {
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "items" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsArrayType",
					elemType: {
						type: "TsKeywordType",
						kind: "string",
					},
				},
			},
			optional: false,
			readonly: false,
		}

		const result = _serializeMember(member)

		assertEquals(result, "items: string[]")
	})

	await t.step("serializes readonly array property", function () {
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "tags" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsArrayType",
					elemType: {
						type: "TsKeywordType",
						kind: "string",
					},
				},
			},
			optional: false,
			readonly: true,
		}

		const result = _serializeMember(member)

		assertEquals(result, "readonly tags: string[]")
	})

	await t.step("serializes method with function type parameter", function () {
		const member: TsMethodSignature = {
			type: "TsMethodSignature",
			key: { value: "map" },
			params: [
				{
					pat: { value: "fn" },
					typeAnnotation: {
						typeAnnotation: {
							type: "TsFunctionType",
							params: [
								{
									pat: { value: "item" },
									typeAnnotation: {
										typeAnnotation: {
											type: "TsKeywordType",
											kind: "string",
										},
									},
								},
							],
							typeAnnotation: {
								type: "TsKeywordType",
								kind: "number",
							},
						},
					},
				},
			],
			typeAnnotation: {
				typeAnnotation: {
					type: "TsArrayType",
					elemType: {
						type: "TsKeywordType",
						kind: "number",
					},
				},
			},
		}

		const result = _serializeMember(member)

		assertEquals(result, "map(fn: (item: string) => number): number[]")
	})

	await t.step("returns empty string for unknown member type", function () {
		const member = {
			type: "UnknownType",
			key: { value: "weird" },
		} as unknown as TsTypeElement

		const result = _serializeMember(member)

		assertEquals(result, "")
	})

	await t.step("handles property with type reference", function () {
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "user" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsTypeReference",
					typeName: { value: "User" },
				},
			},
			optional: false,
			readonly: false,
		}

		const result = _serializeMember(member)

		assertEquals(result, "user: User")
	})

	await t.step("handles property with generic type reference", function () {
		const member: TsPropertySignature = {
			type: "TsPropertySignature",
			key: { value: "items" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsTypeReference",
					typeName: { value: "Array" },
					typeParams: {
						params: [
							{
								type: "TsKeywordType",
								kind: "string",
							},
						],
					},
				},
			},
			optional: false,
			readonly: false,
		}

		const result = _serializeMember(member)

		assertEquals(result, "items: Array<string>")
	})

	await t.step(
		"handles mixed typed and untyped method parameters",
		function () {
			const member: TsMethodSignature = {
				type: "TsMethodSignature",
				key: { value: "process" },
				params: [
					{
						pat: { value: "name" },
						typeAnnotation: {
							typeAnnotation: {
								type: "TsKeywordType",
								kind: "string",
							},
						},
					},
					{
						pat: { value: "value" },
					},
					{
						pat: { value: "options" },
						typeAnnotation: {
							typeAnnotation: {
								type: "TsKeywordType",
								kind: "object",
							},
						},
					},
				],
				typeAnnotation: {
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "boolean",
					},
				},
			}

			const result = _serializeMember(member)

			assertEquals(
				result,
				"process(name: string, value, options: object): boolean",
			)
		},
	)
})
