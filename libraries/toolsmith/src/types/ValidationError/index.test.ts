import { assertEquals } from "@std/assert"

import type ValidationError from "./index.ts"

Deno.test("ValidationError structure - all required fields", () => {
	const error: ValidationError = {
		code: "INTEGER_NOT_SAFE",
		field: "integer",
		messages: ["The system needs a whole number within the safe integer range."],
		received: 3.14,
		expected: "Safe integer",
		suggestion: "Use a whole number between -9,007,199,254,740,991 and 9,007,199,254,740,991",
		severity: "requirement",
	}

	assertEquals(error.code, "INTEGER_NOT_SAFE")
	assertEquals(error.field, "integer")
	assertEquals(error.messages.length, 1)
	assertEquals(error.received, 3.14)
	assertEquals(error.expected, "Safe integer")
	assertEquals(error.suggestion.includes("whole number"), true)
	assertEquals(error.severity, "requirement")
})

Deno.test("ValidationError structure - with optional fields", () => {
	const error: ValidationError = {
		code: "CURRENCY_PRECISION_LOST",
		field: "currency",
		messages: ["The system needs a number with at most 2 decimal places."],
		messageKeys: ["validation.currency.precision_lost"],
		received: 19.999,
		expected: "Currency amount",
		suggestion: "Round to 2 decimal places like 19.99",
		examples: [19.99, 0.01, 100.00],
		constraints: { scale: 2, min: 0 },
		severity: "requirement",
		locale: "en",
		interpolation: { received: "19.999", scale: "2" },
		helpUrl: "https://docs.sitebender.com/validation/currency",
	}

	assertEquals(error.code, "CURRENCY_PRECISION_LOST")
	assertEquals(error.messageKeys?.[0], "validation.currency.precision_lost")
	assertEquals(error.examples?.[0], 19.99)
	assertEquals(error.constraints?.scale, 2)
	assertEquals(error.locale, "en")
	assertEquals(error.interpolation?.received, "19.999")
	assertEquals(error.helpUrl, "https://docs.sitebender.com/validation/currency")
})

Deno.test("ValidationError structure - with nested path", () => {
	const error: ValidationError = {
		code: "PERCENTAGE_OUT_OF_RANGE",
		field: "percentage",
		messages: ["The system needs a value between 0 and 1."],
		received: 1.5,
		expected: "Percentage (0-1)",
		suggestion: "Use a value between 0 (0%) and 1 (100%)",
		path: ["user", "profile", "completionRate"],
		severity: "requirement",
	}

	assertEquals(error.path?.[0], "user")
	assertEquals(error.path?.[1], "profile")
	assertEquals(error.path?.[2], "completionRate")
})

Deno.test("ValidationError structure - severity levels", () => {
	const infoError: ValidationError = {
		code: "INFO_CODE",
		field: "field",
		messages: ["Helpful info"],
		received: "value",
		expected: "Expected",
		suggestion: "Suggestion",
		severity: "info",
	}

	const noticeError: ValidationError = {
		code: "NOTICE_CODE",
		field: "field",
		messages: ["Worth noting"],
		received: "value",
		expected: "Expected",
		suggestion: "Suggestion",
		severity: "notice",
	}

	const requirementError: ValidationError = {
		code: "REQUIREMENT_CODE",
		field: "field",
		messages: ["Must fix"],
		received: "value",
		expected: "Expected",
		suggestion: "Suggestion",
		severity: "requirement",
	}

	assertEquals(infoError.severity, "info")
	assertEquals(noticeError.severity, "notice")
	assertEquals(requirementError.severity, "requirement")
})

Deno.test("ValidationError structure - messages array is mutable for semigroup", () => {
	const error: ValidationError = {
		code: "TEST_CODE",
		field: "field",
		messages: ["First message"],
		received: "value",
		expected: "Expected",
		suggestion: "Suggestion",
		severity: "requirement",
	}

	error.messages.push("Second message")
	assertEquals(error.messages.length, 2)
	assertEquals(error.messages[1], "Second message")
})

Deno.test("ValidationError structure - Serializable types work", () => {
	const numberError: ValidationError = {
		code: "TEST",
		field: "field",
		messages: ["Test"],
		received: 42,
		expected: "Expected",
		suggestion: "Suggestion",
		severity: "requirement",
	}

	const stringError: ValidationError = {
		code: "TEST",
		field: "field",
		messages: ["Test"],
		received: "hello",
		expected: "Expected",
		suggestion: "Suggestion",
		severity: "requirement",
	}

	const objectError: ValidationError = {
		code: "TEST",
		field: "field",
		messages: ["Test"],
		received: { amount: 100, currency: "USD" },
		expected: "Expected",
		suggestion: "Suggestion",
		severity: "requirement",
	}

	const arrayError: ValidationError = {
		code: "TEST",
		field: "field",
		messages: ["Test"],
		received: [1, 2, 3],
		expected: "Expected",
		suggestion: "Suggestion",
		severity: "requirement",
	}

	assertEquals(numberError.received, 42)
	assertEquals(stringError.received, "hello")
	assertEquals(typeof objectError.received, "object")
	assertEquals(Array.isArray(arrayError.received), true)
})
