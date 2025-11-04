import { assertEquals } from "@std/assert"
import _toKebabCase from "./index.ts"

Deno.test("_toKebabCase - converts camelCase to kebab-case", function testCamelToKebab() {
	const result = _toKebabCase("camelCase")
	assertEquals(result, "camel-case")
})

Deno.test("_toKebabCase - converts PascalCase to kebab-case", function testPascalToKebab() {
	const result = _toKebabCase("PascalCase")
	assertEquals(result, "pascal-case")
})

Deno.test("_toKebabCase - converts spaces to dashes", function testSpacesToDashes() {
	const result = _toKebabCase("hello world")
	assertEquals(result, "hello-world")
})

Deno.test("_toKebabCase - converts underscores to dashes", function testUnderscoresToDashes() {
	const result = _toKebabCase("hello_world")
	assertEquals(result, "hello-world")
})

Deno.test("_toKebabCase - handles multiple capitals", function testMultipleCapitals() {
	const result = _toKebabCase("HTMLElement")
	assertEquals(result, "h-t-m-l-element")
})

Deno.test("_toKebabCase - handles already kebab-case", function testAlreadyKebab() {
	const result = _toKebabCase("kebab-case")
	assertEquals(result, "kebab-case")
})

Deno.test("_toKebabCase - handles empty string", function testEmptyString() {
	const result = _toKebabCase("")
	assertEquals(result, "")
})

Deno.test("_toKebabCase - handles single word", function testSingleWord() {
	const result = _toKebabCase("hello")
	assertEquals(result, "hello")
})
