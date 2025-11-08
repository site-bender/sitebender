import { assertEquals } from "@std/assert"
import type {
	TsInterfaceDeclaration,
	TsTypeAliasDeclaration,
	TsTypeDeclaration,
} from "../../types/index.ts"
import extractDefinition from "./index.ts"

Deno.test("extractDefinition", async function tests(t) {
	await t.step("extracts simple type alias without export", function () {
		const node: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "UserId" },
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "type UserId = string")
		}
	})

	await t.step("extracts exported type alias", function () {
		const node: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "UserId" },
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
		}

		const result = extractDefinition(node)(true)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "export type UserId = string")
		}
	})

	await t.step("extracts type alias with union type", function () {
		const node: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "Status" },
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
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, 'type Status = "active" | "inactive"')
		}
	})

	await t.step("extracts type alias with generic parameter", function () {
		const node: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "Box" },
			typeAnnotation: {
				type: "TsTypeReference",
				typeName: { value: "T" },
			},
			typeParams: {
				params: [
					{
						name: { value: "T" },
					},
				],
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "type Box<T> = T")
		}
	})

	await t.step(
		"extracts type alias with constrained generic",
		function () {
			const node: TsTypeAliasDeclaration = {
				type: "TsTypeAliasDeclaration",
				id: { value: "Numeric" },
				typeAnnotation: {
					type: "TsTypeReference",
					typeName: { value: "T" },
				},
				typeParams: {
					params: [
						{
							name: { value: "T" },
							constraint: {
								type: "TsKeywordType",
								kind: "number",
							},
						},
					],
				},
			}

			const result = extractDefinition(node)(false)

			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "type Numeric<T extends number> = T")
			}
		},
	)

	await t.step(
		"extracts type alias with default generic parameter",
		function () {
			const node: TsTypeAliasDeclaration = {
				type: "TsTypeAliasDeclaration",
				id: { value: "Container" },
				typeAnnotation: {
					type: "TsTypeReference",
					typeName: { value: "T" },
				},
				typeParams: {
					params: [
						{
							name: { value: "T" },
							default: {
								type: "TsKeywordType",
								kind: "string",
							},
						},
					],
				},
			}

			const result = extractDefinition(node)(false)

			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "type Container<T = string> = T")
			}
		},
	)

	await t.step("extracts simple interface without export", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "User" },
			body: {
				body: [
					{
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
					},
				],
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "interface User { name: string }")
		}
	})

	await t.step("extracts exported interface", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "User" },
			body: {
				body: [
					{
						type: "TsPropertySignature",
						key: { value: "id" },
						typeAnnotation: {
							typeAnnotation: {
								type: "TsKeywordType",
								kind: "string",
							},
						},
						optional: false,
						readonly: false,
					},
				],
			},
		}

		const result = extractDefinition(node)(true)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "export interface User { id: string }")
		}
	})

	await t.step("extracts interface with multiple properties", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "Person" },
			body: {
				body: [
					{
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
					},
					{
						type: "TsPropertySignature",
						key: { value: "age" },
						typeAnnotation: {
							typeAnnotation: {
								type: "TsKeywordType",
								kind: "number",
							},
						},
						optional: false,
						readonly: false,
					},
				],
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(
				result.value,
				"interface Person { name: string; age: number }",
			)
		}
	})

	await t.step("extracts interface with optional property", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "Config" },
			body: {
				body: [
					{
						type: "TsPropertySignature",
						key: { value: "timeout" },
						typeAnnotation: {
							typeAnnotation: {
								type: "TsKeywordType",
								kind: "number",
							},
						},
						optional: true,
						readonly: false,
					},
				],
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "interface Config { timeout?: number }")
		}
	})

	await t.step("extracts interface with readonly property", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "Entity" },
			body: {
				body: [
					{
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
					},
				],
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "interface Entity { readonly id: string }")
		}
	})

	await t.step("extracts interface with method signature", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "Stringable" },
			body: {
				body: [
					{
						type: "TsMethodSignature",
						key: { value: "toString" },
						params: [],
						typeAnnotation: {
							typeAnnotation: {
								type: "TsKeywordType",
								kind: "string",
							},
						},
					},
				],
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "interface Stringable { toString(): string }")
		}
	})

	await t.step(
		"extracts interface with properties and methods",
		function () {
			const node: TsInterfaceDeclaration = {
				type: "TsInterfaceDeclaration",
				id: { value: "Counter" },
				body: {
					body: [
						{
							type: "TsPropertySignature",
							key: { value: "count" },
							typeAnnotation: {
								typeAnnotation: {
									type: "TsKeywordType",
									kind: "number",
								},
							},
							optional: false,
							readonly: false,
						},
						{
							type: "TsMethodSignature",
							key: { value: "increment" },
							params: [],
							typeAnnotation: {
								typeAnnotation: {
									type: "TsKeywordType",
									kind: "void",
								},
							},
						},
					],
				},
			}

			const result = extractDefinition(node)(false)

			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					result.value,
					"interface Counter { count: number; increment(): void }",
				)
			}
		},
	)

	await t.step("extracts interface with generic parameter", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "Container" },
			body: {
				body: [
					{
						type: "TsPropertySignature",
						key: { value: "value" },
						typeAnnotation: {
							typeAnnotation: {
								type: "TsTypeReference",
								typeName: { value: "T" },
							},
						},
						optional: false,
						readonly: false,
					},
				],
			},
			typeParams: {
				params: [
					{
						name: { value: "T" },
					},
				],
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "interface Container<T> { value: T }")
		}
	})

	await t.step("extracts interface with extends clause", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "Admin" },
			body: {
				body: [
					{
						type: "TsPropertySignature",
						key: { value: "role" },
						typeAnnotation: {
							typeAnnotation: {
								type: "TsKeywordType",
								kind: "string",
							},
						},
						optional: false,
						readonly: false,
					},
				],
			},
			extends: [
				{
					expression: { value: "User" },
				},
			],
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(
				result.value,
				"interface Admin extends User { role: string }",
			)
		}
	})

	await t.step(
		"extracts interface extending multiple interfaces",
		function () {
			const node: TsInterfaceDeclaration = {
				type: "TsInterfaceDeclaration",
				id: { value: "AdminUser" },
				body: {
					body: [
						{
							type: "TsPropertySignature",
							key: { value: "permissions" },
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
						},
					],
				},
				extends: [
					{
						expression: { value: "User" },
					},
					{
						expression: { value: "Admin" },
					},
				],
			}

			const result = extractDefinition(node)(false)

			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					result.value,
					"interface AdminUser extends User, Admin { permissions: string[] }",
				)
			}
		},
	)

	await t.step("extracts empty interface", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "Empty" },
			body: {
				body: [],
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "interface Empty {  }")
		}
	})

	await t.step("extracts type alias with array type", function () {
		const node: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "Names" },
			typeAnnotation: {
				type: "TsArrayType",
				elemType: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "type Names = string[]")
		}
	})

	await t.step("extracts type alias with tuple type", function () {
		const node: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "Point" },
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
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "type Point = [number, number]")
		}
	})

	await t.step("extracts type alias with function type", function () {
		const node: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "Callback" },
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
					kind: "void",
				},
			},
		}

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "type Callback = (value: string) => void")
		}
	})

	await t.step("returns error for unrecognized node type", function () {
		const node = {
			type: "UnknownType",
			id: { value: "Weird" },
		} as unknown as TsTypeDeclaration

		const result = extractDefinition(node)(false)

		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.kind, "UnknownTypeKind")
		}
	})

	await t.step(
		"extracts complex interface with all features",
		function () {
			const node: TsInterfaceDeclaration = {
				type: "TsInterfaceDeclaration",
				id: { value: "Repository" },
				body: {
					body: [
						{
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
						},
						{
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
						},
						{
							type: "TsMethodSignature",
							key: { value: "find" },
							params: [
								{
									pat: { value: "id" },
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
									type: "TsTypeReference",
									typeName: { value: "T" },
								},
							},
						},
					],
				},
				typeParams: {
					params: [
						{
							name: { value: "T" },
						},
					],
				},
				extends: [
					{
						expression: { value: "BaseRepository" },
					},
				],
			}

			const result = extractDefinition(node)(true)

			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(
					result.value,
					"export interface Repository<T> extends BaseRepository { readonly id: string; name: string; find(id: string): T }",
				)
			}
		},
	)

	await t.step(
		"extracts complex type alias with multiple generics",
		function () {
			const node: TsTypeAliasDeclaration = {
				type: "TsTypeAliasDeclaration",
				id: { value: "Mapper" },
				typeAnnotation: {
					type: "TsFunctionType",
					params: [
						{
							pat: { value: "input" },
							typeAnnotation: {
								typeAnnotation: {
									type: "TsTypeReference",
									typeName: { value: "A" },
								},
							},
						},
					],
					typeAnnotation: {
						type: "TsTypeReference",
						typeName: { value: "B" },
					},
				},
				typeParams: {
					params: [
						{
							name: { value: "A" },
						},
						{
							name: { value: "B" },
						},
					],
				},
			}

			const result = extractDefinition(node)(true)

			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "export type Mapper<A, B> = (input: A) => B")
			}
		},
	)
})
