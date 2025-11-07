import { assertEquals } from "@std/assert"
import _serializeMember from "./index.ts"

Deno.test("_serializeMember - simple property signature", function testSimpleProperty() {
	const member = {
		type: "TsPropertySignature",
		key: {
			value: "name",
		},
		typeAnnotation: {
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
		},
		optional: false,
		readonly: false,
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "name: string")
	}
})

Deno.test("_serializeMember - optional property signature", function testOptionalProperty() {
	const member = {
		type: "TsPropertySignature",
		key: {
			value: "age",
		},
		typeAnnotation: {
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "number",
			},
		},
		optional: true,
		readonly: false,
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "age?: number")
	}
})

Deno.test("_serializeMember - readonly property signature", function testReadonlyProperty() {
	const member = {
		type: "TsPropertySignature",
		key: {
			value: "id",
		},
		typeAnnotation: {
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
		},
		optional: false,
		readonly: true,
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "readonly id: string")
	}
})

Deno.test("_serializeMember - property without type annotation", function testPropertyNoType() {
	const member = {
		type: "TsPropertySignature",
		key: {
			value: "data",
		},
		optional: false,
		readonly: false,
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "data")
	}
})

Deno.test("_serializeMember - property with missing key", function testPropertyMissingKey() {
	const member = {
		type: "TsPropertySignature",
		key: {},
		typeAnnotation: {
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
		},
		optional: false,
		readonly: false,
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "MalformedTypeMember")
		assertEquals(result.error.message, "Property signature has no key name")
	}
})

Deno.test("_serializeMember - method signature without parameters", function testMethodNoParams() {
	const member = {
		type: "TsMethodSignature",
		key: {
			value: "toString",
		},
		params: [],
		typeAnnotation: {
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
		},
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "toString(): string")
	}
})

Deno.test("_serializeMember - method signature with parameters", function testMethodWithParams() {
	const member = {
		type: "TsMethodSignature",
		key: {
			value: "greet",
		},
		params: [
			{
				pat: {
					value: "name",
				},
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
				kind: "void",
			},
		},
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "greet(name: string): void")
	}
})

Deno.test("_serializeMember - method signature without return type", function testMethodNoReturnType() {
	const member = {
		type: "TsMethodSignature",
		key: {
			value: "doSomething",
		},
		params: [],
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "doSomething(): void")
	}
})

Deno.test("_serializeMember - method with missing key", function testMethodMissingKey() {
	const member = {
		type: "TsMethodSignature",
		key: {},
		params: [],
		typeAnnotation: {
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "void",
			},
		},
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "MalformedTypeMember")
		assertEquals(result.error.message, "Method signature has no key name")
	}
})

Deno.test("_serializeMember - unsupported member type returns empty", function testUnsupportedType() {
	const member = {
		type: "TsIndexSignature",
		params: [],
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "")
	}
})

Deno.test("_serializeMember - method with multiple parameters", function testMethodMultipleParams() {
	const member = {
		type: "TsMethodSignature",
		key: {
			value: "add",
		},
		params: [
			{
				pat: {
					value: "a",
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
					value: "b",
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
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "number",
			},
		},
	}

	const result = _serializeMember(member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "add(a: number, b: number): number")
	}
})
