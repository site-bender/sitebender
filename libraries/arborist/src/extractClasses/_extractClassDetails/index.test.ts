import { assertEquals } from "@std/assert"
import _extractClassDetails from "./index.ts"
import type { ParsedAst } from "../../types/index.ts"

const mockAst: ParsedAst = {
	sourceText: "class Foo {}",
	module: {
		type: "Module",
		span: { start: 0, end: 12, ctxt: 0 },
		body: [],
	},
}

Deno.test("_extractClassDetails - simple class without members", function testSimpleClass() {
	const classNode = {
		type: "ClassDeclaration",
		identifier: {
			type: "Identifier",
			value: "SimpleClass",
		},
		span: {
			start: 0,
			end: 20,
			ctxt: 0,
		},
		body: [],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.name, "SimpleClass")
		assertEquals(result.value.isExported, false)
		assertEquals(result.value.isDefault, false)
		assertEquals(result.value.isAbstract, false)
		assertEquals(result.value.extends, undefined)
		assertEquals(result.value.implements, [])
		assertEquals(result.value.members, [])
	}
})

Deno.test("_extractClassDetails - exported class", function testExportedClass() {
	const classNode = {
		type: "ExportDeclaration",
		declaration: {
			type: "ClassDeclaration",
			identifier: {
				type: "Identifier",
				value: "ExportedClass",
			},
			span: {
				start: 7,
				end: 30,
				ctxt: 0,
			},
			body: [],
		},
		span: {
			start: 0,
			end: 30,
			ctxt: 0,
		},
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.name, "ExportedClass")
		assertEquals(result.value.isExported, true)
		assertEquals(result.value.isDefault, false)
	}
})

Deno.test("_extractClassDetails - default exported class", function testDefaultExportedClass() {
	const classNode = {
		type: "ExportDefaultDeclaration",
		decl: {
			type: "ClassDeclaration",
			identifier: {
				type: "Identifier",
				value: "DefaultClass",
			},
			span: {
				start: 15,
				end: 35,
				ctxt: 0,
			},
			body: [],
		},
		span: {
			start: 0,
			end: 35,
			ctxt: 0,
		},
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.name, "DefaultClass")
		assertEquals(result.value.isExported, true)
		assertEquals(result.value.isDefault, true)
	}
})

Deno.test("_extractClassDetails - abstract class", function testAbstractClass() {
	const classNode = {
		type: "ClassDeclaration",
		identifier: {
			type: "Identifier",
			value: "AbstractClass",
		},
		span: {
			start: 0,
			end: 30,
			ctxt: 0,
		},
		isAbstract: true,
		body: [],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.isAbstract, true)
	}
})

Deno.test("_extractClassDetails - class with extends", function testClassWithExtends() {
	const classNode = {
		type: "ClassDeclaration",
		identifier: {
			type: "Identifier",
			value: "ChildClass",
		},
		span: {
			start: 0,
			end: 40,
			ctxt: 0,
		},
		superClass: {
			type: "Identifier",
			value: "ParentClass",
		},
		body: [],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.extends, "ParentClass")
	}
})

Deno.test("_extractClassDetails - class with implements", function testClassWithImplements() {
	const classNode = {
		type: "ClassDeclaration",
		identifier: {
			type: "Identifier",
			value: "ImplementingClass",
		},
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		implements: [
			{
				expression: {
					type: "Identifier",
					value: "FirstInterface",
				},
			},
			{
				expression: {
					type: "Identifier",
					value: "SecondInterface",
				},
			},
		],
		body: [],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.implements.length, 2)
		assertEquals(result.value.implements[0], "FirstInterface")
		assertEquals(result.value.implements[1], "SecondInterface")
	}
})

Deno.test("_extractClassDetails - class with single property member", function testClassWithProperty() {
	const classNode = {
		type: "ClassDeclaration",
		identifier: {
			type: "Identifier",
			value: "ClassWithProperty",
		},
		span: {
			start: 0,
			end: 60,
			ctxt: 0,
		},
		body: [
			{
				type: "ClassProperty",
				key: {
					type: "Identifier",
					value: "name",
				},
				span: {
					start: 10,
					end: 20,
					ctxt: 0,
				},
			},
		],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.members.length, 1)
		assertEquals(result.value.members[0].type, "property")
		assertEquals(result.value.members[0].name, "name")
	}
})

Deno.test("_extractClassDetails - class with multiple members", function testClassWithMultipleMembers() {
	const classNode = {
		type: "ClassDeclaration",
		identifier: {
			type: "Identifier",
			value: "ClassWithMembers",
		},
		span: {
			start: 0,
			end: 100,
			ctxt: 0,
		},
		body: [
			{
				type: "ClassProperty",
				key: {
					type: "Identifier",
					value: "prop1",
				},
				span: {
					start: 10,
					end: 20,
					ctxt: 0,
				},
			},
			{
				type: "ClassMethod",
				kind: "method",
				key: {
					type: "Identifier",
					value: "method1",
				},
				function: {
					async: false,
				},
				span: {
					start: 25,
					end: 40,
					ctxt: 0,
				},
			},
			{
				type: "Constructor",
				span: {
					start: 45,
					end: 60,
					ctxt: 0,
				},
			},
		],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.members.length, 3)
		assertEquals(result.value.members[0].type, "property")
		assertEquals(result.value.members[1].type, "method")
		assertEquals(result.value.members[2].type, "constructor")
	}
})

Deno.test("_extractClassDetails - error on unknown node type", function testErrorUnknownNodeType() {
	const classNode = {
		type: "FunctionDeclaration",
		identifier: {
			type: "Identifier",
			value: "NotAClass",
		},
		span: {
			start: 0,
			end: 20,
			ctxt: 0,
		},
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "UnknownNodeType")
	}
})

Deno.test("_extractClassDetails - error on missing class name", function testErrorMissingClassName() {
	const classNode = {
		type: "ClassDeclaration",
		span: {
			start: 0,
			end: 20,
			ctxt: 0,
		},
		body: [],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "MissingClassName")
	}
})

Deno.test("_extractClassDetails - error on missing span", function testErrorMissingSpan() {
	const classNode = {
		type: "ClassDeclaration",
		identifier: {
			type: "Identifier",
			value: "ClassWithoutSpan",
		},
		body: [],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "MissingSpan")
	}
})

Deno.test("_extractClassDetails - error propagates from invalid member", function testErrorFromInvalidMember() {
	const classNode = {
		type: "ClassDeclaration",
		identifier: {
			type: "Identifier",
			value: "ClassWithInvalidMember",
		},
		span: {
			start: 0,
			end: 50,
			ctxt: 0,
		},
		body: [
			{
				type: "ClassProperty",
				key: {
					type: "Identifier",
					value: "validProp",
				},
				span: {
					start: 10,
					end: 20,
					ctxt: 0,
				},
			},
			{
				type: "ClassProperty",
				// Missing key - should cause error
				span: {
					start: 25,
					end: 35,
					ctxt: 0,
				},
			},
		],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidMemberStructure")
	}
})

Deno.test("_extractClassDetails - stops at first member error (fail-fast)", function testFailFastBehavior() {
	const classNode = {
		type: "ClassDeclaration",
		identifier: {
			type: "Identifier",
			value: "ClassWithMultipleErrors",
		},
		span: {
			start: 0,
			end: 70,
			ctxt: 0,
		},
		body: [
			{
				type: "ClassProperty",
				// Missing key - first error
				span: {
					start: 10,
					end: 20,
					ctxt: 0,
				},
			},
			{
				type: "ClassProperty",
				// Also missing key - second error (should not be reached)
				span: {
					start: 25,
					end: 35,
					ctxt: 0,
				},
			},
		],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	// Should fail on first error, not accumulate both
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidMemberStructure")
	}
})

Deno.test("_extractClassDetails - handles empty class body", function testEmptyClassBody() {
	const classNode = {
		type: "ClassDeclaration",
		identifier: {
			type: "Identifier",
			value: "EmptyClass",
		},
		span: {
			start: 0,
			end: 20,
			ctxt: 0,
		},
		// No body field
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.members, [])
	}
})

Deno.test("_extractClassDetails - class expression", function testClassExpression() {
	const classNode = {
		type: "ClassExpression",
		identifier: {
			type: "Identifier",
			value: "ClassExpr",
		},
		span: {
			start: 0,
			end: 25,
			ctxt: 0,
		},
		body: [],
	}

	const result = _extractClassDetails(mockAst)(classNode)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.name, "ClassExpr")
	}
})
