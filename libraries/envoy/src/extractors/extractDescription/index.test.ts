import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"

import extractDescription from "./index.ts"

type Comment = {
	kind: "line" | "block"
	text: string
	fullText: string
	type: "description" | "example" | "gotcha" | "pro" | "law"
	position: "before" | "after"
}

describe("extractDescription", () => {
	describe("description comment extraction", () => {
		it("should extract description comment positioned before function", () => {
			const comments: Array<Comment> = [
				{
					kind: "line",
					text: "Validates an email address using regex pattern matching",
					fullText:
						"//++ Validates an email address using regex pattern matching",
					type: "description",
					position: "before",
				},
				{
					kind: "line",
					text: '[EXAMPLE] validateEmail("test@example.com") // true',
					fullText: '//?? [EXAMPLE] validateEmail("test@example.com") // true',
					type: "example",
					position: "after",
				},
			]
			const result = extractDescription(comments)
			assertEquals(
				result,
				"Validates an email address using regex pattern matching",
			)
		})

		it("should return undefined when no description comment exists", () => {
			const comments: Array<Comment> = [
				{
					kind: "line",
					text: '[EXAMPLE] validateEmail("test@example.com") // true',
					fullText: '//?? [EXAMPLE] validateEmail("test@example.com") // true',
					type: "example",
					position: "after",
				},
				{
					kind: "line",
					text: "[GOTCHA] Does not validate against disposable email providers",
					fullText:
						"//?? [GOTCHA] Does not validate against disposable email providers",
					type: "gotcha",
					position: "after",
				},
			]
			const result = extractDescription(comments)
			assertEquals(result, undefined)
		})

		it("should return undefined when description comment is positioned after", () => {
			const comments: Array<Comment> = [
				{
					kind: "line",
					text: "This is a description but positioned after",
					fullText: "//++ This is a description but positioned after",
					type: "description",
					position: "after",
				},
			]
			const result = extractDescription(comments)
			assertEquals(result, undefined)
		})

		it("should return first description comment when multiple exist", () => {
			const comments: Array<Comment> = [
				{
					kind: "line",
					text: "First description comment",
					fullText: "//++ First description comment",
					type: "description",
					position: "before",
				},
				{
					kind: "line",
					text: "Second description comment",
					fullText: "//++ Second description comment",
					type: "description",
					position: "before",
				},
			]
			const result = extractDescription(comments)
			assertEquals(result, "First description comment")
		})

		it("should handle block comment descriptions", () => {
			const comments: Array<Comment> = [
				{
					kind: "block",
					text: "Multi-line description\nspanning multiple lines",
					fullText: "/*++ Multi-line description\nspanning multiple lines */",
					type: "description",
					position: "before",
				},
			]
			const result = extractDescription(comments)
			assertEquals(result, "Multi-line description\nspanning multiple lines")
		})

		it("should handle empty comments array", () => {
			const comments: Array<Comment> = []
			const result = extractDescription(comments)
			assertEquals(result, undefined)
		})

		it("should handle comments with special characters", () => {
			const comments: Array<Comment> = [
				{
					kind: "line",
					text: "Function with @symbols #hashtags & special characters!",
					fullText:
						"//++ Function with @symbols #hashtags & special characters!",
					type: "description",
					position: "before",
				},
			]
			const result = extractDescription(comments)
			assertEquals(
				result,
				"Function with @symbols #hashtags & special characters!",
			)
		})

		it("should ignore non-description comment types", () => {
			const comments: Array<Comment> = [
				{
					kind: "line",
					text: "This is a gotcha comment",
					fullText: "//?? [GOTCHA] This is a gotcha comment",
					type: "gotcha",
					position: "before",
				},
				{
					kind: "line",
					text: "This is a pro comment",
					fullText: "//?? [PRO] This is a pro comment",
					type: "pro",
					position: "before",
				},
				{
					kind: "line",
					text: "This is the actual description",
					fullText: "//++ This is the actual description",
					type: "description",
					position: "before",
				},
			]
			const result = extractDescription(comments)
			assertEquals(result, "This is the actual description")
		})

		it("should handle law comment types", () => {
			const comments: Array<Comment> = [
				{
					kind: "line",
					text: "Commutative law: f(a, b) = f(b, a)",
					fullText: "//?? [LAW] Commutative law: f(a, b) = f(b, a)",
					type: "law",
					position: "before",
				},
			]
			const result = extractDescription(comments)
			assertEquals(result, undefined)
		})

		it("should handle mixed comment positions", () => {
			const comments: Array<Comment> = [
				{
					kind: "line",
					text: "Example after function",
					fullText: "//?? [EXAMPLE] Example after function",
					type: "example",
					position: "after",
				},
				{
					kind: "line",
					text: "Description before function",
					fullText: "//++ Description before function",
					type: "description",
					position: "before",
				},
				{
					kind: "line",
					text: "Another example after",
					fullText: "//?? [EXAMPLE] Another example after",
					type: "example",
					position: "after",
				},
			]
			const result = extractDescription(comments)
			assertEquals(result, "Description before function")
		})
	})
})
