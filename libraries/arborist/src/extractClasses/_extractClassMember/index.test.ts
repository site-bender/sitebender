import { assertEquals } from "@std/assert"
import _extractClassMember from "./index.ts"

Deno.test("_extractClassMember - simple public property", function testSimplePublicProperty() {
	const memberNode = {
		type: "ClassProperty",
		span: {
			start: 0,
			end: 20,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
			value: "name",
		},
		isStatic: false,
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "property")
		assertEquals(result.value.name, "name")
		assertEquals(result.value.isStatic, false)
		assertEquals(result.value.isPrivate, false)
		assertEquals(result.value.isProtected, false)
		assertEquals(result.value.isAsync, false)
		assertEquals(result.value.parameters, [])
		assertEquals(result.value.returnType, undefined)
	}
})

Deno.test("_extractClassMember - private static property", function testPrivateStaticProperty() {
	const memberNode = {
		type: "ClassProperty",
		span: {
			start: 0,
			end: 20,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
			value: "count",
		},
		isStatic: true,
		accessibility: "private",
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "property")
		assertEquals(result.value.name, "count")
		assertEquals(result.value.isStatic, true)
		assertEquals(result.value.isPrivate, true)
		assertEquals(result.value.isProtected, false)
	}
})

Deno.test("_extractClassMember - protected property", function testProtectedProperty() {
	const memberNode = {
		type: "ClassProperty",
		span: {
			start: 0,
			end: 20,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
			value: "value",
		},
		isStatic: false,
		accessibility: "protected",
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.isPrivate, false)
		assertEquals(result.value.isProtected, true)
	}
})

Deno.test("_extractClassMember - simple public method", function testSimplePublicMethod() {
	const memberNode = {
		type: "ClassMethod",
		kind: "method",
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
			value: "getData",
		},
		isStatic: false,
		function: {
			async: false,
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "method")
		assertEquals(result.value.name, "getData")
		assertEquals(result.value.isStatic, false)
		assertEquals(result.value.isPrivate, false)
		assertEquals(result.value.isProtected, false)
		assertEquals(result.value.isAsync, false)
		assertEquals(result.value.parameters, [])
	}
})

Deno.test("_extractClassMember - async method", function testAsyncMethod() {
	const memberNode = {
		type: "ClassMethod",
		kind: "method",
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
			value: "fetchData",
		},
		isStatic: false,
		function: {
			async: true,
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.isAsync, true)
	}
})

Deno.test("_extractClassMember - static method", function testStaticMethod() {
	const memberNode = {
		type: "ClassMethod",
		kind: "method",
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
			value: "create",
		},
		isStatic: true,
		function: {
			async: false,
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.isStatic, true)
	}
})

Deno.test("_extractClassMember - method with return type", function testMethodWithReturnType() {
	const memberNode = {
		type: "ClassMethod",
		kind: "method",
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
			value: "getId",
		},
		isStatic: false,
		function: {
			async: false,
		},
		returnType: {
			typeAnnotation: {
				type: "TsKeywordType",
				kind: "string",
			},
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.returnType, "string")
	}
})

Deno.test("_extractClassMember - getter", function testGetter() {
	const memberNode = {
		type: "ClassMethod",
		kind: "getter",
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
			value: "fullName",
		},
		isStatic: false,
		function: {
			async: false,
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "getter")
		assertEquals(result.value.name, "fullName")
	}
})

Deno.test("_extractClassMember - setter with parameter", function testSetterWithParameter() {
	const memberNode = {
		type: "ClassMethod",
		kind: "setter",
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
			value: "fullName",
		},
		isStatic: false,
		function: {
			async: false,
		},
		params: [
			{
				pat: {
					type: "Identifier",
					value: "value",
					optional: false,
				},
			},
		],
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "setter")
		assertEquals(result.value.name, "fullName")
		assertEquals(result.value.parameters.length, 1)
		assertEquals(result.value.parameters[0].name, "value")
		assertEquals(result.value.parameters[0].type, "unknown")
		assertEquals(result.value.parameters[0].optional, false)
	}
})

Deno.test("_extractClassMember - constructor with no parameters", function testConstructorNoParams() {
	const memberNode = {
		type: "Constructor",
		span: {
			start: 0,
			end: 30,
			ctxt: 0,
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "constructor")
		assertEquals(result.value.name, "constructor")
		assertEquals(result.value.isStatic, false)
		assertEquals(result.value.parameters, [])
	}
})

Deno.test("_extractClassMember - constructor with parameters", function testConstructorWithParams() {
	const memberNode = {
		type: "Constructor",
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		params: [
			{
				pat: {
					type: "Identifier",
					value: "name",
					optional: false,
				},
			},
			{
				pat: {
					type: "Identifier",
					value: "age",
					optional: true,
				},
			},
		],
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.parameters.length, 2)
		assertEquals(result.value.parameters[0].name, "name")
		assertEquals(result.value.parameters[0].optional, false)
		assertEquals(result.value.parameters[1].name, "age")
		assertEquals(result.value.parameters[1].optional, true)
	}
})

Deno.test("_extractClassMember - private constructor", function testPrivateConstructor() {
	const memberNode = {
		type: "Constructor",
		span: {
			start: 0,
			end: 30,
			ctxt: 0,
		},
		accessibility: "private",
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.isPrivate, true)
	}
})

Deno.test("_extractClassMember - error on unknown member type", function testErrorUnknownMemberType() {
	const memberNode = {
		type: "UnknownMemberType",
		span: {
			start: 0,
			end: 20,
			ctxt: 0,
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidMemberStructure")
	}
})

Deno.test("_extractClassMember - error on property without key", function testErrorPropertyWithoutKey() {
	const memberNode = {
		type: "ClassProperty",
		span: {
			start: 0,
			end: 20,
			ctxt: 0,
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidMemberStructure")
	}
})

Deno.test("_extractClassMember - error on property key without value", function testErrorPropertyKeyWithoutValue() {
	const memberNode = {
		type: "ClassProperty",
		span: {
			start: 0,
			end: 20,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidMemberStructure")
	}
})

Deno.test("_extractClassMember - error on method without key", function testErrorMethodWithoutKey() {
	const memberNode = {
		type: "ClassMethod",
		kind: "method",
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		function: {
			async: false,
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidMemberStructure")
	}
})

Deno.test("_extractClassMember - error on method key without value", function testErrorMethodKeyWithoutValue() {
	const memberNode = {
		type: "ClassMethod",
		kind: "method",
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
		},
		function: {
			async: false,
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidMemberStructure")
	}
})

Deno.test("_extractClassMember - error on missing span", function testErrorMissingSpan() {
	const memberNode = {
		type: "ClassProperty",
		key: {
			type: "Identifier",
			value: "name",
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "MissingSpan")
	}
})

Deno.test("_extractClassMember - error on invalid return type", function testErrorInvalidReturnType() {
	const memberNode = {
		type: "ClassMethod",
		kind: "method",
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		key: {
			type: "Identifier",
			value: "getData",
		},
		function: {
			async: false,
		},
		returnType: {
			typeAnnotation: {
				type: "InvalidTypeNode",
			},
		},
	}

	const result = _extractClassMember("")(memberNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidMemberStructure")
	}
})
