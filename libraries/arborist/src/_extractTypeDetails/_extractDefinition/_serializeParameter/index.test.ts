import { assertEquals } from "@std/assert"
import _serializeParameter from "./index.ts"

Deno.test("_serializeParameter - parameter without type annotation", function testParameterWithoutType() {
	const param = {
		pat: {
			value: "foo",
		},
	}

	const result = _serializeParameter(param as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "foo")
	}
})

Deno.test("_serializeParameter - parameter with type annotation", function testParameterWithType() {
	const param = {
		pat: {
			value: "foo",
		},
		typeAnnotation: {
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
		},
	}

	const result = _serializeParameter(param as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "foo: string")
	}
})

Deno.test("_serializeParameter - parameter with missing name", function testParameterMissingName() {
	const param = {
		pat: {},
	}

	const result = _serializeParameter(param as never)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidTypeParameter")
		assertEquals(result.error.message, "Parameter has no name")
	}
})

Deno.test("_serializeParameter - parameter with complex type annotation", function testParameterComplexType() {
	const param = {
		pat: {
			value: "callback",
		},
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

	const result = _serializeParameter(param as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "callback: () => void")
	}
})

Deno.test("_serializeParameter - parameter with array type", function testParameterArrayType() {
	const param = {
		pat: {
			value: "items",
		},
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

	const result = _serializeParameter(param as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "items: string[]")
	}
})
