import { assertEquals } from "@std/assert"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import _serializeMembers from "./index.ts"

Deno.test("_serializeMembers - empty accumulator with property member", function testEmptyAccumulatorProperty() {
	const member = {
		type: "TsPropertySignature",
		key: {
			value: "foo",
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

	const result = _serializeMembers(ok([]), member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, ["foo: string"])
	}
})

Deno.test("_serializeMembers - accumulator with existing member", function testAccumulatorWithMember() {
	const member = {
		type: "TsPropertySignature",
		key: {
			value: "bar",
		},
		typeAnnotation: {
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "number",
			},
		},
		optional: false,
		readonly: false,
	}

	const result = _serializeMembers(ok(["foo: string"]), member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, ["foo: string", "bar: number"])
	}
})

Deno.test("_serializeMembers - skips empty serializations", function testSkipEmpty() {
	const member = {
		type: "TsIndexSignature",
		params: [],
		typeAnnotation: undefined,
	}

	const result = _serializeMembers(ok(["foo: string"]), member as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, ["foo: string"])
	}
})

Deno.test("_serializeMembers - propagates error from accumulator", function testErrorPropagation() {
	const member = {
		type: "TsPropertySignature",
		key: {
			value: "bar",
		},
		typeAnnotation: {
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "number",
			},
		},
		optional: false,
		readonly: false,
	}

	const errorResult = {
		_tag: "Error" as const,
		error: {
			operation: "extractTypes" as const,
			kind: "MalformedTypeMember" as const,
			message: "Test error",
			code: "TEST_ERROR",
			args: [],
			timestamp: Date.now(),
		},
	}

	const result = _serializeMembers(errorResult, member as never)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.message, "Test error")
	}
})

Deno.test("_serializeMembers - propagates error from _serializeMember", function testMemberError() {
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

	const result = _serializeMembers(ok([]), member as never)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "MalformedTypeMember")
	}
})

Deno.test("_serializeMembers - works with reduce for multiple members", function testReduceMultiple() {
	const members = [
		{
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
		},
		{
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
		},
		{
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
		},
	]

	const result = reduce(_serializeMembers)(ok([]))(members as never)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.length, 3)
		assertEquals(result.value[0], "readonly id: string")
		assertEquals(result.value[1], "name: string")
		assertEquals(result.value[2], "age?: number")
	}
})
