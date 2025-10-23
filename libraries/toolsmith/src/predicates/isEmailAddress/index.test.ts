import { assertEquals } from "@std/assert"
import isEmailAddress from "./index.ts"

Deno.test("_isEmailAddress: accepts valid simple email", function () {
	assertEquals(isEmailAddress("user@example.com"), true)
})

Deno.test("_isEmailAddress: accepts email with dots", function () {
	assertEquals(isEmailAddress("first.last@example.com"), true)
})

Deno.test("_isEmailAddress: accepts email with plus", function () {
	assertEquals(isEmailAddress("user+tag@example.com"), true)
})

Deno.test("_isEmailAddress: accepts internationalized local part", function () {
	assertEquals(isEmailAddress("josé@example.com"), true)
})

Deno.test("_isEmailAddress: accepts internationalized domain", function () {
	assertEquals(isEmailAddress("user@münchen.de"), true)
})

Deno.test("_isEmailAddress: accepts fully internationalized", function () {
	assertEquals(isEmailAddress("用户@example.com"), true)
})

Deno.test("_isEmailAddress: normalizes case", function () {
	assertEquals(isEmailAddress("User@EXAMPLE.COM"), true)
})

Deno.test("_isEmailAddress: rejects empty string", function () {
	assertEquals(isEmailAddress(""), false)
})

Deno.test("_isEmailAddress: rejects missing @", function () {
	assertEquals(isEmailAddress("userexample.com"), false)
})

Deno.test("_isEmailAddress: rejects multiple @", function () {
	assertEquals(isEmailAddress("user@@example.com"), false)
})

Deno.test("_isEmailAddress: rejects missing local part", function () {
	assertEquals(isEmailAddress("@example.com"), false)
})

Deno.test("_isEmailAddress: rejects missing domain", function () {
	assertEquals(isEmailAddress("user@"), false)
})

Deno.test("_isEmailAddress: rejects domain without TLD", function () {
	assertEquals(isEmailAddress("user@example"), false)
})

Deno.test("_isEmailAddress: rejects leading dot in local", function () {
	assertEquals(isEmailAddress(".user@example.com"), false)
})

Deno.test("_isEmailAddress: rejects trailing dot in local", function () {
	assertEquals(isEmailAddress("user.@example.com"), false)
})

Deno.test("_isEmailAddress: rejects consecutive dots in local", function () {
	assertEquals(isEmailAddress("user..name@example.com"), false)
})

Deno.test("_isEmailAddress: rejects local too long", function () {
	const longLocal = "a".repeat(65) + "@example.com"

	assertEquals(isEmailAddress(longLocal), false)
})

Deno.test("_isEmailAddress: rejects total too long", function () {
	const longEmail = "a".repeat(250) + "@b.co"

	assertEquals(isEmailAddress(longEmail), false)
})
