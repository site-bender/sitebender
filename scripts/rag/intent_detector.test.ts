/**
 * Tests for Intent Detector
 */

import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import detectIntent, { getEncodingTypesForIntent } from "./intent_detector.ts"

Deno.test("detectIntent - create action", function testCreateAction() {
	const intent = detectIntent("Create a new function to process users")
	assertEquals(intent.action, 'create')
})

Deno.test("detectIntent - fix action", function testFixAction() {
	const intent = detectIntent("Fix the error in this function")
	assertEquals(intent.action, 'fix')
})

Deno.test("detectIntent - modify action", function testModifyAction() {
	const intent = detectIntent("Refactor this code to be more functional")
	assertEquals(intent.action, 'modify')
})

Deno.test("detectIntent - explain action", function testExplainAction() {
	const intent = detectIntent("Explain how Result monads work")
	assertEquals(intent.action, 'explain')
})

Deno.test("detectIntent - example action", function testExampleAction() {
	const intent = detectIntent("Show me an example of a curried function")
	assertEquals(intent.action, 'example')
})

Deno.test("detectIntent - extracts function subject", function testFunctionSubject() {
	const intent = detectIntent("Create a function to validate email")
	assertEquals(intent.subject, 'function')
})

Deno.test("detectIntent - extracts component subject", function testComponentSubject() {
	const intent = detectIntent("Build a component for user profile")
	assertEquals(intent.subject, 'component')
})

Deno.test("detectIntent - extracts type subject", function testTypeSubject() {
	const intent = detectIntent("Define a type for user data")
	assertEquals(intent.subject, 'type')
})

Deno.test("detectIntent - extracts context keywords", function testContextKeywords() {
	const intent = detectIntent("Create an async function that validates input and handles errors")
	assertEquals(intent.context.includes('async'), true)
	assertEquals(intent.context.includes('validate'), true)
	assertEquals(intent.context.includes('error'), true)
})

Deno.test("detectIntent - general subject fallback", function testGeneralFallback() {
	const intent = detectIntent("Help me with this code")
	assertEquals(intent.subject, 'general')
})

Deno.test("getEncodingTypesForIntent - create", function testCreateEncodings() {
	const types = getEncodingTypesForIntent({
		action: 'create',
		subject: 'function',
		context: []
	})
	assertEquals(types.includes('pattern'), true)
	assertEquals(types.includes('example'), true)
})

Deno.test("getEncodingTypesForIntent - fix", function testFixEncodings() {
	const types = getEncodingTypesForIntent({
		action: 'fix',
		subject: 'function',
		context: []
	})
	assertEquals(types.includes('antipattern'), true)
	assertEquals(types.includes('pattern'), true)
})

Deno.test("getEncodingTypesForIntent - explain", function testExplainEncodings() {
	const types = getEncodingTypesForIntent({
		action: 'explain',
		subject: 'monad',
		context: []
	})
	assertEquals(types.includes('principle'), true)
	assertEquals(types.includes('example'), true)
})

Deno.test("getEncodingTypesForIntent - example", function testExampleEncodings() {
	const types = getEncodingTypesForIntent({
		action: 'example',
		subject: 'function',
		context: []
	})
	assertEquals(types.includes('example'), true)
	assertEquals(types.includes('counterexample'), true)
})

Deno.test("getEncodingTypesForIntent - modify", function testModifyEncodings() {
	const types = getEncodingTypesForIntent({
		action: 'modify',
		subject: 'function',
		context: []
	})
	assertEquals(types.includes('pattern'), true)
	assertEquals(types.includes('principle'), true)
})
