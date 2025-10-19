import { assertEquals } from "@std/assert"
import type {
	ExportDeclaration,
	TsInterfaceDeclaration,
	TsTypeAliasDeclaration,
	TypeDeclarationNode,
} from "../types/index.ts"
import _extractTypeDetails from "./index.ts"

Deno.test("_extractTypeDetails", async function tests(t) {
	await t.step("extracts type alias without export", function () {
		const node: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "UserId" },
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
			span: { start: 0, end: 22 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "UserId")
		assertEquals(result.isExported, false)
		assertEquals(result.definition, "type UserId = string")
		assertEquals(result.span, { start: 0, end: 22 })
		assertEquals(result.position, { line: 1, column: 0 })
	})

	await t.step("extracts exported type alias", function () {
		const declaration: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "ProductId" },
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "number",
			},
			span: { start: 7, end: 34 },
		}

		const node: ExportDeclaration = {
			type: "ExportDeclaration",
			declaration,
			span: { start: 0, end: 34 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "ProductId")
		assertEquals(result.isExported, true)
		assertEquals(result.definition, "export type ProductId = number")
		assertEquals(result.span, { start: 0, end: 34 })
		assertEquals(result.position, { line: 1, column: 0 })
	})

	await t.step("extracts interface without export", function () {
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
			span: { start: 0, end: 30 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "User")
		assertEquals(result.isExported, false)
		assertEquals(result.definition, "interface User { name: string }")
		assertEquals(result.span, { start: 0, end: 30 })
		assertEquals(result.position, { line: 1, column: 0 })
	})

	await t.step("extracts exported interface", function () {
		const declaration: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "Product" },
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
			span: { start: 7, end: 42 },
		}

		const node: ExportDeclaration = {
			type: "ExportDeclaration",
			declaration,
			span: { start: 0, end: 42 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "Product")
		assertEquals(result.isExported, true)
		assertEquals(result.definition, "export interface Product { id: string }")
		assertEquals(result.span, { start: 0, end: 42 })
	})

	await t.step("extracts type with union", function () {
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
			span: { start: 0, end: 45 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "Status")
		assertEquals(result.definition, 'type Status = "active" | "inactive"')
	})

	await t.step("extracts type with generic parameters", function () {
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
			span: { start: 0, end: 18 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "Box")
		assertEquals(result.definition, "type Box<T> = T")
	})

	await t.step("extracts interface with multiple properties", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "Point" },
			body: {
				body: [
					{
						type: "TsPropertySignature",
						key: { value: "x" },
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
						type: "TsPropertySignature",
						key: { value: "y" },
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
			span: { start: 0, end: 42 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "Point")
		assertEquals(
			result.definition,
			"interface Point { x: number; y: number }",
		)
	})

	await t.step("extracts interface with method", function () {
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
			span: { start: 0, end: 50 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "Stringable")
		assertEquals(
			result.definition,
			"interface Stringable { toString(): string }",
		)
	})

	await t.step("uses span from outer export wrapper", function () {
		const declaration: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "Id" },
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
			span: { start: 7, end: 24 },
		}

		const node: ExportDeclaration = {
			type: "ExportDeclaration",
			declaration,
			span: { start: 0, end: 24 },
		}

		const result = _extractTypeDetails(node)("source text")

		// Should use outer span (0-24), not inner span (7-24)
		assertEquals(result.span, { start: 0, end: 24 })
		assertEquals(result.position, { line: 1, column: 0 })
	})

	await t.step("handles node without span", function () {
		const node: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "NoSpan" },
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "NoSpan")
		assertEquals(result.span, { start: 0, end: 0 })
		assertEquals(result.position, { line: 1, column: 0 })
	})

	await t.step(
		"curried function works with different source texts",
		function () {
			const node: TsTypeAliasDeclaration = {
				type: "TsTypeAliasDeclaration",
				id: { value: "Test" },
				typeAnnotation: {
					type: "TsKeywordType",
					kind: "boolean",
				},
				span: { start: 0, end: 20 },
			}

			const extractor = _extractTypeDetails(node)

			const result1 = extractor("first source")
			const result2 = extractor("second source")

			assertEquals(result1.name, "Test")
			assertEquals(result2.name, "Test")
			assertEquals(result1.definition, result2.definition)
		},
	)

	await t.step("extracts interface with extends", function () {
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
			span: { start: 0, end: 50 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "Admin")
		assertEquals(
			result.definition,
			"interface Admin extends User { role: string }",
		)
	})

	await t.step("extracts readonly optional properties", function () {
		const node: TsInterfaceDeclaration = {
			type: "TsInterfaceDeclaration",
			id: { value: "Config" },
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
						key: { value: "port" },
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
			span: { start: 0, end: 60 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.name, "Config")
		assertEquals(
			result.definition,
			"interface Config { readonly id: string; port?: number }",
		)
	})

	await t.step("position uses span start for column", function () {
		const node: TsTypeAliasDeclaration = {
			type: "TsTypeAliasDeclaration",
			id: { value: "Test" },
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
			span: { start: 42, end: 65 },
		}

		const result = _extractTypeDetails(node)("source text")

		assertEquals(result.position, { line: 1, column: 42 })
	})
})
