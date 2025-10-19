import { assertEquals } from "@std/assert"
import type { SwcFnParam } from "../../../types/index.ts"
import _serializeParameter from "./index.ts"

Deno.test("_serializeParameter", async function tests(t) {
	await t.step("serializes parameter with string type", function () {
		const param: SwcFnParam = {
			pat: { value: "name" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "name: string")
	})

	await t.step("serializes parameter with number type", function () {
		const param: SwcFnParam = {
			pat: { value: "age" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "number",
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "age: number")
	})

	await t.step("serializes parameter with boolean type", function () {
		const param: SwcFnParam = {
			pat: { value: "isActive" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "boolean",
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "isActive: boolean")
	})

	await t.step("serializes parameter without type annotation", function () {
		const param: SwcFnParam = {
			pat: { value: "value" },
		}

		const result = _serializeParameter(param)

		assertEquals(result, "value")
	})

	await t.step("serializes parameter with array type", function () {
		const param: SwcFnParam = {
			pat: { value: "items" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsArrayType",
					elemType: {
						type: "TsKeywordType",
						kind: "string",
					},
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "items: string[]")
	})

	await t.step("serializes parameter with union type", function () {
		const param: SwcFnParam = {
			pat: { value: "status" },
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
		}

		const result = _serializeParameter(param)

		assertEquals(result, 'status: "active" | "inactive"')
	})

	await t.step("serializes parameter with type reference", function () {
		const param: SwcFnParam = {
			pat: { value: "user" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsTypeReference",
					typeName: { value: "User" },
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "user: User")
	})

	await t.step("serializes parameter with generic type", function () {
		const param: SwcFnParam = {
			pat: { value: "items" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsTypeReference",
					typeName: { value: "Array" },
					typeParams: {
						params: [
							{
								type: "TsKeywordType",
								kind: "number",
							},
						],
					},
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "items: Array<number>")
	})

	await t.step("serializes parameter with function type", function () {
		const param: SwcFnParam = {
			pat: { value: "callback" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsFunctionType",
					params: [
						{
							pat: { value: "value" },
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
		}

		const result = _serializeParameter(param)

		assertEquals(result, "callback: (value: string) => number")
	})

	await t.step("serializes parameter with object literal type", function () {
		const param: SwcFnParam = {
			pat: { value: "options" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsTypeLiteral",
					members: [
						{
							type: "TsPropertySignature",
							key: { value: "timeout" },
							typeAnnotation: {
								typeAnnotation: {
									type: "TsKeywordType",
									kind: "number",
								},
							},
							optional: false,
						},
					],
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "options: { timeout: number }")
	})

	await t.step("serializes parameter name with underscores", function () {
		const param: SwcFnParam = {
			pat: { value: "_privateValue" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "_privateValue: string")
	})

	await t.step("serializes parameter with camelCase name", function () {
		const param: SwcFnParam = {
			pat: { value: "firstName" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "firstName: string")
	})

	await t.step("serializes parameter with void type", function () {
		const param: SwcFnParam = {
			pat: { value: "callback" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsFunctionType",
					params: [],
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "void",
					},
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "callback: () => void")
	})

	await t.step("serializes parameter with tuple type", function () {
		const param: SwcFnParam = {
			pat: { value: "coordinates" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsTupleType",
					elemTypes: [
						{
							ty: {
								type: "TsKeywordType",
								kind: "number",
							},
						},
						{
							ty: {
								type: "TsKeywordType",
								kind: "number",
							},
						},
					],
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "coordinates: [number, number]")
	})

	await t.step("serializes parameter with intersection type", function () {
		const param: SwcFnParam = {
			pat: { value: "combined" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsIntersectionType",
					types: [
						{
							type: "TsTypeReference",
							typeName: { value: "User" },
						},
						{
							type: "TsTypeReference",
							typeName: { value: "Admin" },
						},
					],
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "combined: User & Admin")
	})

	await t.step("serializes multiple parameters in sequence", function () {
		const params: ReadonlyArray<SwcFnParam> = [
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
				pat: { value: "age" },
				typeAnnotation: {
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "number",
					},
				},
			},
			{
				pat: { value: "active" },
				typeAnnotation: {
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "boolean",
					},
				},
			},
		]

		const results = params.map((param) => _serializeParameter(param))

		assertEquals(results, [
			"name: string",
			"age: number",
			"active: boolean",
		])
	})

	await t.step("handles parameter with unknown type annotation", function () {
		const param: SwcFnParam = {
			pat: { value: "data" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "unknown",
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "data: unknown")
	})

	await t.step("handles parameter with any type annotation", function () {
		const param: SwcFnParam = {
			pat: { value: "data" },
			typeAnnotation: {
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "any",
				},
			},
		}

		const result = _serializeParameter(param)

		assertEquals(result, "data: any")
	})
})
