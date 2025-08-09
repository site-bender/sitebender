import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import Error from "../../../constructors/Error/index.ts"

Deno.test("Error should create an error configuration with all required properties", () => {
	const createError = Error("validation")
	const typeError = createError("type")
	const result = typeError("Invalid input type")

	assertEquals(result.tag, "Error")
	assertEquals(result.operation, "validation")
	assertEquals(result.type, "type")
	assertEquals(result.message, "Invalid input type")
})

Deno.test("Error should handle different operation types", () => {
	const authError = Error("authentication")("login")("Invalid credentials")
	const dbError = Error("database")("connection")("Connection failed")
	const parsingError = Error("parsing")("json")("Invalid JSON format")

	assertEquals(authError.operation, "authentication")
	assertEquals(authError.type, "login")
	assertEquals(authError.message, "Invalid credentials")

	assertEquals(dbError.operation, "database")
	assertEquals(dbError.type, "connection")
	assertEquals(dbError.message, "Connection failed")

	assertEquals(parsingError.operation, "parsing")
	assertEquals(parsingError.type, "json")
	assertEquals(parsingError.message, "Invalid JSON format")
})

Deno.test("Error should maintain curried structure", () => {
	const createValidationError = Error("validation")
	const createTypeError = createValidationError("type")

	// Should be able to reuse the partially applied functions
	const error1 = createTypeError("Expected string")
	const error2 = createTypeError("Expected number")

	assertEquals(error1.operation, "validation")
	assertEquals(error1.type, "type")
	assertEquals(error1.message, "Expected string")

	assertEquals(error2.operation, "validation")
	assertEquals(error2.type, "type")
	assertEquals(error2.message, "Expected number")
})

Deno.test("Error should handle empty strings", () => {
	const result = Error("")("")("")

	assertEquals(result.tag, "Error")
	assertEquals(result.operation, "")
	assertEquals(result.type, "")
	assertEquals(result.message, "")
})

Deno.test("Error should handle special characters in messages", () => {
	const result = Error("api")("request")(
		"HTTP 404: Resource not found at '/api/users'",
	)

	assertEquals(result.tag, "Error")
	assertEquals(result.operation, "api")
	assertEquals(result.type, "request")
	assertEquals(result.message, "HTTP 404: Resource not found at '/api/users'")
})
