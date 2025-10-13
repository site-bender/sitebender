
//++ Tests for validateBlueprint function

import { assertEquals } from "https://deno.land/std@0.220.0/assert/mod.ts"
import validateBlueprint from "./index.ts"
import type { Blueprint } from "../../schema/blueprint/index.ts"

Deno.test("validateBlueprint - valid minimal blueprint", function testValidMinimalBlueprint() {
	const blueprint: Blueprint = {
		id: "test-blueprint",
		name: "Test Blueprint",
		description: "A test blueprint",
		outputs: {
			appPath: "test-app",
		},
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Ok") {
		assertEquals(true, true, "Valid blueprint should return Ok")
	} else {
		throw new Error("Expected Ok result")
	}
})

Deno.test("validateBlueprint - missing id", function testMissingId() {
	const blueprint: Blueprint = {
		id: "",
		name: "Test Blueprint",
		description: "A test blueprint",
		outputs: {
			appPath: "test-app",
		},
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Error") {
		const errors = result.error
		assertEquals(errors.length, 1)
		assertEquals(errors[0]._tag, "ValidationError")
		if (errors[0]._tag === "ValidationError") {
			assertEquals(errors[0].field, "id")
		}
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("validateBlueprint - missing name", function testMissingName() {
	const blueprint: Blueprint = {
		id: "test-blueprint",
		name: "",
		description: "A test blueprint",
		outputs: {
			appPath: "test-app",
		},
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Error") {
		const errors = result.error
		assertEquals(errors.length, 1)
		assertEquals(errors[0]._tag, "ValidationError")
		if (errors[0]._tag === "ValidationError") {
			assertEquals(errors[0].field, "name")
		}
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("validateBlueprint - missing description", function testMissingDescription() {
	const blueprint: Blueprint = {
		id: "test-blueprint",
		name: "Test Blueprint",
		description: "",
		outputs: {
			appPath: "test-app",
		},
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Error") {
		const errors = result.error
		assertEquals(errors.length, 1)
		assertEquals(errors[0]._tag, "ValidationError")
		if (errors[0]._tag === "ValidationError") {
			assertEquals(errors[0].field, "description")
		}
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("validateBlueprint - path traversal in appPath", function testPathTraversalAppPath() {
	const blueprint: Blueprint = {
		id: "test-blueprint",
		name: "Test Blueprint",
		description: "A test blueprint",
		outputs: {
			appPath: "../evil",
		},
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Error") {
		const errors = result.error
		assertEquals(errors.length, 1)
		assertEquals(errors[0]._tag, "PathTraversal")
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("validateBlueprint - absolute path in appPath", function testAbsolutePathAppPath() {
	const blueprint: Blueprint = {
		id: "test-blueprint",
		name: "Test Blueprint",
		description: "A test blueprint",
		outputs: {
			appPath: "/etc/passwd",
		},
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Error") {
		const errors = result.error
		assertEquals(errors.length, 1)
		assertEquals(errors[0]._tag, "PathTraversal")
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("validateBlueprint - valid file specs", function testValidFileSpecs() {
	const blueprint: Blueprint = {
		id: "test-blueprint",
		name: "Test Blueprint",
		description: "A test blueprint",
		outputs: {
			appPath: "test-app",
		},
		files: [
			{
				targetPath: "index.html",
				mode: "copy",
			},
			{
				targetPath: "server.ts",
				mode: "template",
				sourcePath: "common/server.ts",
			},
		],
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Ok") {
		assertEquals(true, true, "Valid blueprint should return Ok")
	} else {
		throw new Error("Expected Ok result")
	}
})

Deno.test("validateBlueprint - missing targetPath in file", function testMissingTargetPath() {
	const blueprint: Blueprint = {
		id: "test-blueprint",
		name: "Test Blueprint",
		description: "A test blueprint",
		outputs: {
			appPath: "test-app",
		},
		files: [
			{
				targetPath: "",
				mode: "copy",
			},
		],
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Error") {
		const errors = result.error
		assertEquals(errors.length, 1)
		assertEquals(errors[0]._tag, "ValidationError")
		if (errors[0]._tag === "ValidationError") {
			assertEquals(errors[0].field, "files[0].targetPath")
		}
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("validateBlueprint - invalid mode", function testInvalidMode() {
	const blueprint: Blueprint = {
		id: "test-blueprint",
		name: "Test Blueprint",
		description: "A test blueprint",
		outputs: {
			appPath: "test-app",
		},
		files: [
			{
				targetPath: "index.html",
				mode: "invalid" as "copy",
			},
		],
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Error") {
		const errors = result.error
		assertEquals(errors.length, 1)
		assertEquals(errors[0]._tag, "ValidationError")
		if (errors[0]._tag === "ValidationError") {
			assertEquals(errors[0].field, "files[0].mode")
		}
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("validateBlueprint - template mode missing sourcePath", function testTemplateMissingSource() {
	const blueprint: Blueprint = {
		id: "test-blueprint",
		name: "Test Blueprint",
		description: "A test blueprint",
		outputs: {
			appPath: "test-app",
		},
		files: [
			{
				targetPath: "server.ts",
				mode: "template",
			},
		],
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Error") {
		const errors = result.error
		assertEquals(errors.length, 1)
		assertEquals(errors[0]._tag, "ValidationError")
		if (errors[0]._tag === "ValidationError") {
			assertEquals(errors[0].field, "files[0].sourcePath")
		}
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("validateBlueprint - path traversal in sourcePath", function testPathTraversalSource() {
	const blueprint: Blueprint = {
		id: "test-blueprint",
		name: "Test Blueprint",
		description: "A test blueprint",
		outputs: {
			appPath: "test-app",
		},
		files: [
			{
				targetPath: "server.ts",
				mode: "template",
				sourcePath: "../../../etc/passwd",
			},
		],
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Error") {
		const errors = result.error
		assertEquals(errors.length, 1)
		assertEquals(errors[0]._tag, "PathTraversal")
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("validateBlueprint - multiple errors accumulated", function testMultipleErrors() {
	const blueprint: Blueprint = {
		id: "",
		name: "",
		description: "A test blueprint",
		outputs: {
			appPath: "../evil",
		},
	}

	const result = validateBlueprint(blueprint)()
	if (result._tag === "Error") {
		const errors = result.error
		assertEquals(errors.length, 3)
	} else {
		throw new Error("Expected Error result")
	}
})
