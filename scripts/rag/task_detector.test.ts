/**
 * Tests for Task Type Detector
 */

import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import detectTaskType from "./task_detector.ts"

Deno.test("detectTaskType - error handling keywords", function testErrorHandling() {
	const result = detectTaskType("How do I handle errors in this function?")
	assertEquals(result.includes("error-handling"), true)
})

Deno.test("detectTaskType - type definition keywords", function testTypeDefinition() {
	const result = detectTaskType("Create a branded type for UserId")
	assertEquals(result.includes("type-definition"), true)
})

Deno.test("detectTaskType - testing keywords", function testTesting() {
	const result = detectTaskType("Write tests for this function")
	assertEquals(result.includes("testing"), true)
})

Deno.test("detectTaskType - async operation keywords", function testAsyncOperation() {
	const result = detectTaskType("Fetch data from the API using async/await")
	assertEquals(result.includes("async-operation"), true)
})

Deno.test("detectTaskType - validation keywords", function testValidation() {
	const result = detectTaskType("Validate the user input")
	assertEquals(result.includes("validation"), true)
})

Deno.test("detectTaskType - file operation keywords", function testFileOperation() {
	const result = detectTaskType("Read the file from disk")
	assertEquals(result.includes("file-operation"), true)
})

Deno.test("detectTaskType - component keywords", function testComponent() {
	const result = detectTaskType("Create a React component with props")
	assertEquals(result.includes("component"), true)
})

Deno.test("detectTaskType - multiple task types", function testMultipleTypes() {
	const result = detectTaskType(
		"Create an async function that validates input and handles errors",
	)
	assertEquals(result.includes("async-operation"), true)
	assertEquals(result.includes("validation"), true)
	assertEquals(result.includes("error-handling"), true)
})

Deno.test("detectTaskType - general fallback", function testGeneralFallback() {
	const result = detectTaskType("Refactor this code")
	assertEquals(result, ["general"])
})

Deno.test("detectTaskType - case insensitive", function testCaseInsensitive() {
	const result = detectTaskType("HANDLE ERRORS IN ASYNC FUNCTION")
	assertEquals(result.includes("error-handling"), true)
	assertEquals(result.includes("async-operation"), true)
})
