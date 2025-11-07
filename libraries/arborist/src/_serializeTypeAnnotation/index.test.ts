import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import type { TypeExtractionError } from "../types/errors/index.ts"

import _serializeTypeAnnotation from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("_serializeTypeAnnotation - null node returns ok with unknown", function testNullNode() {
	const result = _serializeTypeAnnotation(null)

	assert(isOk(result), "Should return ok for null")

	if (isOk(result)) {
		assertEquals(result.value, "unknown")
	}
})

Deno.test("_serializeTypeAnnotation - undefined node returns ok with unknown", function testUndefinedNode() {
	const result = _serializeTypeAnnotation(undefined)

	assert(isOk(result), "Should return ok for undefined")

	if (isOk(result)) {
		assertEquals(result.value, "unknown")
	}
})

Deno.test("_serializeTypeAnnotation - node without type property returns error", function testNoTypeProperty() {
	const node = {
		someField: "value",
	}

	const result = _serializeTypeAnnotation(node)

	assert(isError(result), "Should return error for node without type")

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "UnsupportedTypeNode")
		assertEquals(err.operation, "extractTypes")
		assert(
			err.message.includes("no type property"),
			"Error message should mention missing type property",
		)
	}
})

Deno.test("_serializeTypeAnnotation - unknown type node returns error", function testUnknownType() {
	const node = {
		type: "UnknownTypeNode",
	}

	const result = _serializeTypeAnnotation(node)

	assert(isError(result), "Should return error for unknown type")

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "UnsupportedTypeNode")
		assertEquals(err.nodeType, "UnknownTypeNode")
		assert(
			err.message.includes("Unsupported type node"),
			"Error message should mention unsupported type",
		)
	}
})

// TsKeywordType tests

Deno.test("_serializeTypeAnnotation - TsKeywordType string returns ok", function testKeywordString() {
	const node = {
		type: "TsKeywordType",
		kind: "string",
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for keyword type")

	if (isOk(result)) {
		assertEquals(result.value, "string")
	}
})

Deno.test("_serializeTypeAnnotation - TsKeywordType number returns ok", function testKeywordNumber() {
	const node = {
		type: "TsKeywordType",
		kind: "number",
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for keyword type")

	if (isOk(result)) {
		assertEquals(result.value, "number")
	}
})

Deno.test("_serializeTypeAnnotation - TsKeywordType without kind returns error", function testKeywordNoKind() {
	const node = {
		type: "TsKeywordType",
	}

	const result = _serializeTypeAnnotation(node)

	assert(isError(result), "Should return error for keyword type without kind")

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "MalformedTypeMember")
		assert(
			err.message.includes("no kind"),
			"Error message should mention missing kind",
		)
	}
})

// TsTypeReference tests

Deno.test("_serializeTypeAnnotation - TsTypeReference simple returns ok", function testTypeReferenceSimple() {
	const node = {
		type: "TsTypeReference",
		typeName: {
			type: "Identifier",
			value: "MyType",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for type reference")

	if (isOk(result)) {
		assertEquals(result.value, "MyType")
	}
})

Deno.test("_serializeTypeAnnotation - TsTypeReference with single generic returns ok", function testTypeReferenceSingleGeneric() {
	const node = {
		type: "TsTypeReference",
		typeName: {
			type: "Identifier",
			value: "Array",
		},
		typeParams: {
			params: [
				{
					type: "TsKeywordType",
					kind: "string",
				},
			],
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for type reference with generic")

	if (isOk(result)) {
		assertEquals(result.value, "Array<string>")
	}
})

Deno.test("_serializeTypeAnnotation - TsTypeReference with multiple generics returns ok", function testTypeReferenceMultipleGenerics() {
	const node = {
		type: "TsTypeReference",
		typeName: {
			type: "Identifier",
			value: "Map",
		},
		typeParams: {
			params: [
				{
					type: "TsKeywordType",
					kind: "string",
				},
				{
					type: "TsKeywordType",
					kind: "number",
				},
			],
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(
		isOk(result),
		"Should return ok for type reference with multiple generics",
	)

	if (isOk(result)) {
		assertEquals(result.value, "Map<string, number>")
	}
})

Deno.test("_serializeTypeAnnotation - TsTypeReference nested generics returns ok", function testTypeReferenceNestedGenerics() {
	const node = {
		type: "TsTypeReference",
		typeName: {
			type: "Identifier",
			value: "Array",
		},
		typeParams: {
			params: [
				{
					type: "TsTypeReference",
					typeName: {
						type: "Identifier",
						value: "Array",
					},
					typeParams: {
						params: [
							{
								type: "TsKeywordType",
								kind: "string",
							},
						],
					},
				},
			],
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for nested generics")

	if (isOk(result)) {
		assertEquals(result.value, "Array<Array<string>>")
	}
})

Deno.test("_serializeTypeAnnotation - TsTypeReference without typeName returns error", function testTypeReferenceNoTypeName() {
	const node = {
		type: "TsTypeReference",
	}

	const result = _serializeTypeAnnotation(node)

	assert(
		isError(result),
		"Should return error for type reference without typeName",
	)

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "MalformedTypeMember")
		assert(
			err.message.includes("no typeName"),
			"Error message should mention missing typeName",
		)
	}
})

Deno.test("_serializeTypeAnnotation - TsTypeReference with typeName without value returns error", function testTypeReferenceNoValue() {
	const node = {
		type: "TsTypeReference",
		typeName: {
			type: "Identifier",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isError(result), "Should return error for typeName without value")

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "MalformedTypeMember")
		assert(
			err.message.includes("no value"),
			"Error message should mention missing value",
		)
	}
})

// TsArrayType tests

Deno.test("_serializeTypeAnnotation - TsArrayType simple returns ok", function testArrayTypeSimple() {
	const node = {
		type: "TsArrayType",
		elemType: {
			type: "TsKeywordType",
			kind: "string",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for array type")

	if (isOk(result)) {
		assertEquals(result.value, "string[]")
	}
})

Deno.test("_serializeTypeAnnotation - TsArrayType nested returns ok", function testArrayTypeNested() {
	const node = {
		type: "TsArrayType",
		elemType: {
			type: "TsArrayType",
			elemType: {
				type: "TsKeywordType",
				kind: "string",
			},
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for nested array type")

	if (isOk(result)) {
		assertEquals(result.value, "string[][]")
	}
})

Deno.test("_serializeTypeAnnotation - TsArrayType with complex element returns ok", function testArrayTypeComplex() {
	const node = {
		type: "TsArrayType",
		elemType: {
			type: "TsTypeReference",
			typeName: {
				type: "Identifier",
				value: "MyType",
			},
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for array of complex type")

	if (isOk(result)) {
		assertEquals(result.value, "MyType[]")
	}
})

// TsTupleType tests

Deno.test("_serializeTypeAnnotation - TsTupleType simple returns ok", function testTupleTypeSimple() {
	const node = {
		type: "TsTupleType",
		elemTypes: [
			{
				ty: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
			{
				ty: {
					type: "TsKeywordType",
					kind: "number",
				},
			},
		],
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for tuple type")

	if (isOk(result)) {
		assertEquals(result.value, "[string, number]")
	}
})

Deno.test("_serializeTypeAnnotation - TsTupleType empty returns ok", function testTupleTypeEmpty() {
	const node = {
		type: "TsTupleType",
		elemTypes: [],
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for empty tuple")

	if (isOk(result)) {
		assertEquals(result.value, "[]")
	}
})

Deno.test("_serializeTypeAnnotation - TsTupleType with complex types returns ok", function testTupleTypeComplex() {
	const node = {
		type: "TsTupleType",
		elemTypes: [
			{
				ty: {
					type: "TsTypeReference",
					typeName: {
						type: "Identifier",
						value: "User",
					},
				},
			},
			{
				ty: {
					type: "TsArrayType",
					elemType: {
						type: "TsKeywordType",
						kind: "string",
					},
				},
			},
		],
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for tuple with complex types")

	if (isOk(result)) {
		assertEquals(result.value, "[User, string[]]")
	}
})

// Batch 2.2: Complex Types - TsUnionType tests

Deno.test("_serializeTypeAnnotation - TsUnionType simple returns ok", function testUnionTypeSimple() {
	const node = {
		type: "TsUnionType",
		types: [
			{
				type: "TsKeywordType",
				kind: "string",
			},
			{
				type: "TsKeywordType",
				kind: "number",
			},
		],
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for union type")

	if (isOk(result)) {
		assertEquals(result.value, "string | number")
	}
})

Deno.test("_serializeTypeAnnotation - TsUnionType with multiple members returns ok", function testUnionTypeMultiple() {
	const node = {
		type: "TsUnionType",
		types: [
			{
				type: "TsKeywordType",
				kind: "string",
			},
			{
				type: "TsKeywordType",
				kind: "number",
			},
			{
				type: "TsKeywordType",
				kind: "boolean",
			},
			{
				type: "TsKeywordType",
				kind: "null",
			},
		],
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for union with multiple members")

	if (isOk(result)) {
		assertEquals(result.value, "string | number | boolean | null")
	}
})

Deno.test("_serializeTypeAnnotation - TsUnionType nested returns ok", function testUnionTypeNested() {
	const node = {
		type: "TsUnionType",
		types: [
			{
				type: "TsTypeReference",
				typeName: {
					type: "Identifier",
					value: "User",
				},
			},
			{
				type: "TsArrayType",
				elemType: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
		],
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for nested union")

	if (isOk(result)) {
		assertEquals(result.value, "User | string[]")
	}
})

// Batch 2.2: Complex Types - TsIntersectionType tests

Deno.test("_serializeTypeAnnotation - TsIntersectionType simple returns ok", function testIntersectionTypeSimple() {
	const node = {
		type: "TsIntersectionType",
		types: [
			{
				type: "TsTypeReference",
				typeName: {
					type: "Identifier",
					value: "Named",
				},
			},
			{
				type: "TsTypeReference",
				typeName: {
					type: "Identifier",
					value: "Aged",
				},
			},
		],
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for intersection type")

	if (isOk(result)) {
		assertEquals(result.value, "Named & Aged")
	}
})

Deno.test("_serializeTypeAnnotation - TsIntersectionType with multiple members returns ok", function testIntersectionTypeMultiple() {
	const node = {
		type: "TsIntersectionType",
		types: [
			{
				type: "TsTypeReference",
				typeName: {
					type: "Identifier",
					value: "A",
				},
			},
			{
				type: "TsTypeReference",
				typeName: {
					type: "Identifier",
					value: "B",
				},
			},
			{
				type: "TsTypeReference",
				typeName: {
					type: "Identifier",
					value: "C",
				},
			},
		],
	}

	const result = _serializeTypeAnnotation(node)

	assert(
		isOk(result),
		"Should return ok for intersection with multiple members",
	)

	if (isOk(result)) {
		assertEquals(result.value, "A & B & C")
	}
})

// Batch 2.2: Complex Types - TsFunctionType tests

Deno.test("_serializeTypeAnnotation - TsFunctionType simple returns ok", function testFunctionTypeSimple() {
	const node = {
		type: "TsFunctionType",
		params: [],
		typeAnnotation: {
			type: "TsKeywordType",
			kind: "void",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for function type")

	if (isOk(result)) {
		assertEquals(result.value, "() => void")
	}
})

Deno.test("_serializeTypeAnnotation - TsFunctionType with params returns ok", function testFunctionTypeWithParams() {
	const node = {
		type: "TsFunctionType",
		params: [
			{
				pat: {
					type: "Identifier",
					value: "x",
				},
				typeAnnotation: {
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "number",
					},
				},
			},
			{
				pat: {
					type: "Identifier",
					value: "y",
				},
				typeAnnotation: {
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "number",
					},
				},
			},
		],
		typeAnnotation: {
			type: "TsKeywordType",
			kind: "number",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for function with params")

	if (isOk(result)) {
		assertEquals(result.value, "(x: number, y: number) => number")
	}
})

Deno.test("_serializeTypeAnnotation - TsFunctionType with param without type returns ok", function testFunctionTypeParamNoType() {
	const node = {
		type: "TsFunctionType",
		params: [
			{
				pat: {
					type: "Identifier",
					value: "arg",
				},
			},
		],
		typeAnnotation: {
			type: "TsKeywordType",
			kind: "void",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for function with untyped param")

	if (isOk(result)) {
		assertEquals(result.value, "(arg) => void")
	}
})

// Batch 2.2: Complex Types - TsConditionalType tests

Deno.test("_serializeTypeAnnotation - TsConditionalType simple returns ok", function testConditionalTypeSimple() {
	const node = {
		type: "TsConditionalType",
		checkType: {
			type: "TsTypeReference",
			typeName: {
				type: "Identifier",
				value: "T",
			},
		},
		extendsType: {
			type: "TsKeywordType",
			kind: "string",
		},
		trueType: {
			type: "TsKeywordType",
			kind: "number",
		},
		falseType: {
			type: "TsKeywordType",
			kind: "boolean",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for conditional type")

	if (isOk(result)) {
		assertEquals(result.value, "T extends string ? number : boolean")
	}
})

Deno.test("_serializeTypeAnnotation - TsConditionalType nested returns ok", function testConditionalTypeNested() {
	const node = {
		type: "TsConditionalType",
		checkType: {
			type: "TsTypeReference",
			typeName: {
				type: "Identifier",
				value: "T",
			},
		},
		extendsType: {
			type: "TsKeywordType",
			kind: "string",
		},
		trueType: {
			type: "TsKeywordType",
			kind: "string",
		},
		falseType: {
			type: "TsConditionalType",
			checkType: {
				type: "TsTypeReference",
				typeName: {
					type: "Identifier",
					value: "T",
				},
			},
			extendsType: {
				type: "TsKeywordType",
				kind: "number",
			},
			trueType: {
				type: "TsKeywordType",
				kind: "number",
			},
			falseType: {
				type: "TsKeywordType",
				kind: "never",
			},
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for nested conditional")

	if (isOk(result)) {
		assertEquals(
			result.value,
			"T extends string ? string : T extends number ? number : never",
		)
	}
})

// Batch 2.3: Advanced Types - TsTypeLiteral tests

Deno.test("_serializeTypeAnnotation - TsTypeLiteral simple returns ok", function testTypeLiteralSimple() {
	const node = {
		type: "TsTypeLiteral",
		members: [
			{
				type: "TsPropertySignature",
				key: {
					type: "Identifier",
					value: "name",
				},
				typeAnnotation: {
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "string",
					},
				},
			},
			{
				type: "TsPropertySignature",
				key: {
					type: "Identifier",
					value: "age",
				},
				typeAnnotation: {
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "number",
					},
				},
			},
		],
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for type literal")

	if (isOk(result)) {
		assertEquals(result.value, "{ name: string; age: number }")
	}
})

Deno.test("_serializeTypeAnnotation - TsTypeLiteral with optional property returns ok", function testTypeLiteralOptional() {
	const node = {
		type: "TsTypeLiteral",
		members: [
			{
				type: "TsPropertySignature",
				key: {
					type: "Identifier",
					value: "name",
				},
				typeAnnotation: {
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "string",
					},
				},
			},
			{
				type: "TsPropertySignature",
				key: {
					type: "Identifier",
					value: "age",
				},
				optional: true,
				typeAnnotation: {
					typeAnnotation: {
						type: "TsKeywordType",
						kind: "number",
					},
				},
			},
		],
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for type literal with optional")

	if (isOk(result)) {
		assertEquals(result.value, "{ name: string; age?: number }")
	}
})

Deno.test("_serializeTypeAnnotation - TsTypeLiteral empty returns ok", function testTypeLiteralEmpty() {
	const node = {
		type: "TsTypeLiteral",
		members: [],
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for empty type literal")

	if (isOk(result)) {
		assertEquals(result.value, "{  }")
	}
})

// Batch 2.3: Advanced Types - TsMappedType tests

Deno.test("_serializeTypeAnnotation - TsMappedType simple returns ok", function testMappedTypeSimple() {
	const node = {
		type: "TsMappedType",
		typeParam: {
			name: {
				type: "Identifier",
				value: "K",
			},
			constraint: {
				type: "TsKeywordType",
				kind: "string",
			},
		},
		typeAnnotation: {
			type: "TsKeywordType",
			kind: "boolean",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for mapped type")

	if (isOk(result)) {
		assertEquals(result.value, "{ [K in string]: boolean }")
	}
})

Deno.test("_serializeTypeAnnotation - TsMappedType without constraint returns ok", function testMappedTypeNoConstraint() {
	const node = {
		type: "TsMappedType",
		typeParam: {
			name: {
				type: "Identifier",
				value: "K",
			},
		},
		typeAnnotation: {
			type: "TsKeywordType",
			kind: "string",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for mapped type without constraint")

	if (isOk(result)) {
		assertEquals(result.value, "{ [K in unknown]: string }")
	}
})

Deno.test("_serializeTypeAnnotation - TsMappedType without typeParam returns error", function testMappedTypeNoTypeParam() {
	const node = {
		type: "TsMappedType",
	}

	const result = _serializeTypeAnnotation(node)

	assert(
		isError(result),
		"Should return error for mapped type without typeParam",
	)

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "MalformedTypeMember")
		assert(
			err.message.includes("no typeParam"),
			"Error message should mention missing typeParam",
		)
	}
})

// Batch 2.3: Advanced Types - TsIndexedAccessType tests

Deno.test("_serializeTypeAnnotation - TsIndexedAccessType simple returns ok", function testIndexedAccessTypeSimple() {
	const node = {
		type: "TsIndexedAccessType",
		objectType: {
			type: "TsTypeReference",
			typeName: {
				type: "Identifier",
				value: "User",
			},
		},
		indexType: {
			type: "TsLiteralType",
			literal: {
				type: "StringLiteral",
				value: "name",
			},
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for indexed access type")

	if (isOk(result)) {
		assertEquals(result.value, 'User["name"]')
	}
})

Deno.test("_serializeTypeAnnotation - TsIndexedAccessType nested returns ok", function testIndexedAccessTypeNested() {
	const node = {
		type: "TsIndexedAccessType",
		objectType: {
			type: "TsIndexedAccessType",
			objectType: {
				type: "TsTypeReference",
				typeName: {
					type: "Identifier",
					value: "Nested",
				},
			},
			indexType: {
				type: "TsLiteralType",
				literal: {
					type: "StringLiteral",
					value: "outer",
				},
			},
		},
		indexType: {
			type: "TsLiteralType",
			literal: {
				type: "StringLiteral",
				value: "inner",
			},
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for nested indexed access")

	if (isOk(result)) {
		assertEquals(result.value, 'Nested["outer"]["inner"]')
	}
})

// Batch 2.3: Advanced Types - TsTypeQuery tests

Deno.test("_serializeTypeAnnotation - TsTypeQuery simple returns ok", function testTypeQuerySimple() {
	const node = {
		type: "TsTypeQuery",
		exprName: {
			type: "Identifier",
			value: "myVariable",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for type query")

	if (isOk(result)) {
		assertEquals(result.value, "typeof myVariable")
	}
})

Deno.test("_serializeTypeAnnotation - TsTypeQuery without exprName returns error", function testTypeQueryNoExprName() {
	const node = {
		type: "TsTypeQuery",
	}

	const result = _serializeTypeAnnotation(node)

	assert(isError(result), "Should return error for type query without exprName")

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "MalformedTypeMember")
		assert(
			err.message.includes("no exprName"),
			"Error message should mention missing exprName",
		)
	}
})

// Batch 2.3: Advanced Types - TsLiteralType tests (comprehensive)

Deno.test("_serializeTypeAnnotation - TsLiteralType string returns ok", function testLiteralTypeString() {
	const node = {
		type: "TsLiteralType",
		literal: {
			type: "StringLiteral",
			value: "hello",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for string literal")

	if (isOk(result)) {
		assertEquals(result.value, '"hello"')
	}
})

Deno.test("_serializeTypeAnnotation - TsLiteralType number returns ok", function testLiteralTypeNumber() {
	const node = {
		type: "TsLiteralType",
		literal: {
			type: "NumericLiteral",
			value: 42,
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for number literal")

	if (isOk(result)) {
		assertEquals(result.value, "42")
	}
})

Deno.test("_serializeTypeAnnotation - TsLiteralType boolean returns ok", function testLiteralTypeBoolean() {
	const node = {
		type: "TsLiteralType",
		literal: {
			type: "BooleanLiteral",
			value: true,
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for boolean literal")

	if (isOk(result)) {
		assertEquals(result.value, "true")
	}
})

Deno.test("_serializeTypeAnnotation - TsLiteralType without literal returns error", function testLiteralTypeNoLiteral() {
	const node = {
		type: "TsLiteralType",
	}

	const result = _serializeTypeAnnotation(node)

	assert(
		isError(result),
		"Should return error for literal type without literal",
	)

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "MalformedTypeMember")
		assert(
			err.message.includes("no literal"),
			"Error message should mention missing literal",
		)
	}
})

// Batch 2.3: Advanced Types - TsParenthesizedType tests

Deno.test("_serializeTypeAnnotation - TsParenthesizedType simple returns ok", function testParenthesizedTypeSimple() {
	const node = {
		type: "TsParenthesizedType",
		typeAnnotation: {
			type: "TsKeywordType",
			kind: "string",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for parenthesized type")

	if (isOk(result)) {
		assertEquals(result.value, "(string)")
	}
})

Deno.test("_serializeTypeAnnotation - TsParenthesizedType with union returns ok", function testParenthesizedTypeUnion() {
	const node = {
		type: "TsParenthesizedType",
		typeAnnotation: {
			type: "TsUnionType",
			types: [
				{
					type: "TsKeywordType",
					kind: "string",
				},
				{
					type: "TsKeywordType",
					kind: "number",
				},
			],
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for parenthesized union")

	if (isOk(result)) {
		assertEquals(result.value, "(string | number)")
	}
})

// Batch 2.3: Advanced Types - TsOptionalType tests

Deno.test("_serializeTypeAnnotation - TsOptionalType simple returns ok", function testOptionalTypeSimple() {
	const node = {
		type: "TsOptionalType",
		typeAnnotation: {
			type: "TsKeywordType",
			kind: "string",
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for optional type")

	if (isOk(result)) {
		assertEquals(result.value, "string?")
	}
})

// Batch 2.3: Advanced Types - TsRestType tests

Deno.test("_serializeTypeAnnotation - TsRestType simple returns ok", function testRestTypeSimple() {
	const node = {
		type: "TsRestType",
		typeAnnotation: {
			type: "TsArrayType",
			elemType: {
				type: "TsKeywordType",
				kind: "string",
			},
		},
	}

	const result = _serializeTypeAnnotation(node)

	assert(isOk(result), "Should return ok for rest type")

	if (isOk(result)) {
		assertEquals(result.value, "...string[]")
	}
})
