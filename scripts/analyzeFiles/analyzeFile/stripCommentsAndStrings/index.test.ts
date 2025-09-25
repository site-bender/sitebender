import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import stripCommentsAndStrings from "./index.ts"

Deno.test(
	"stripCommentsAndStrings",
	async function testStripCommentsAndStrings(t) {
		await t.step(
			"removes single line comments",
			function testSingleLineComments() {
				const input = "const x = 5 // this is a comment\nconst y = 10"
				const expected = "const x = 5 \nconst y = 10"

				assertEquals(stripCommentsAndStrings(input), expected)
			},
		)

		await t.step(
			"removes multi line comments",
			function testMultiLineComments() {
				const input =
					"const x = 5\n/* this is a\n   multiline comment */\nconst y = 10"
				const expected = "const x = 5\n\nconst y = 10"

				assertEquals(stripCommentsAndStrings(input), expected)
			},
		)

		await t.step("removes strings", function testStrings() {
			const input = "const msg = \"hello world\"\nconst name = 'John'"
			const expected = "const msg = \"\"\nconst name = ''"

			assertEquals(stripCommentsAndStrings(input), expected)
		})

		await t.step("removes template strings", function testTemplateStrings() {
			const input = "const msg = `hello \${name}`"
			const expected = "const msg = ``"

			assertEquals(stripCommentsAndStrings(input), expected)
		})

		await t.step("handles mixed content", function testMixed() {
			const input =
				'// comment\nconst x = "string" // another comment\n/* block */ const y = 10'
			const expected = '\nconst x = "" \n const y = 10'

			assertEquals(stripCommentsAndStrings(input), expected)
		})

		await t.step("preserves code structure", function testPreservesStructure() {
			const input = 'function test() {\n\treturn "value"\n}'
			const expected = 'function test() {\n\treturn ""\n}'

			assertEquals(stripCommentsAndStrings(input), expected)
		})
	},
)
