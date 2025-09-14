import { assertEquals } from "https://deno.land/std/assert/mod.ts"

// Import the parent module and extract the migrate function
// Since migrate is not exported, we'll test via the module's behavior
import { migrate } from "../testExports.ts"

//++ Tests for migrate function that converts Envoy blocks from asterisk to pipe style
Deno.test("migrate", async function testMigrate(t) {
	await t.step("leaves non-Envoy content unchanged", function testNoChange() {
		const input = `
// Regular comment
function test() {
	return 42
}
`
		const result = migrate(input)

		assertEquals(result.changed, false)
		assertEquals(result.text, input)
	})

	await t.step("converts simple asterisk block to pipe style", function testSimpleConversion() {
		const input = `
/*??
 * [EXAMPLE] This is an example
 * with multiple lines
 */
`
		const expected = `
/*??
 | [EXAMPLE] This is an example
 | with multiple lines
 */
`
		const result = migrate(input)

		assertEquals(result.changed, true)
		assertEquals(result.text, expected)
	})

	await t.step("handles blocks with mixed asterisk and content", function testMixedContent() {
		const input = `
/*??
 * [GOTCHA] Something to watch out for
 * * Nested bullet point
 * Regular line
 */
`
		const expected = `
/*??
 | [GOTCHA] Something to watch out for
 | * Nested bullet point
 | Regular line
 */
`
		const result = migrate(input)

		assertEquals(result.changed, true)
		assertEquals(result.text, expected)
	})

	await t.step("preserves indentation", function testIndentation() {
		const input = `
	/*??
	 * [EXAMPLE] Indented block
	 * with proper spacing
	 */
`
		const expected = `
	/*??
	 | [EXAMPLE] Indented block
	 | with proper spacing
	 */
`
		const result = migrate(input)

		assertEquals(result.changed, true)
		assertEquals(result.text, expected)
	})

	await t.step("handles empty lines in blocks", function testEmptyLines() {
		const input = `
/*??
 * [EXAMPLE] Block with empty lines
 *
 * After empty line
 */
`
		const expected = `
/*??
 | [EXAMPLE] Block with empty lines
 |
 | After empty line
 */
`
		const result = migrate(input)

		assertEquals(result.changed, true)
		assertEquals(result.text, expected)
	})

	await t.step("skips blocks already in pipe style", function testAlreadyPipeStyle() {
		const input = `
/*??
 | [EXAMPLE] Already converted
 | to pipe style
 */
`
		const result = migrate(input)

		assertEquals(result.changed, false)
		assertEquals(result.text, input)
	})

	await t.step("handles multiple blocks in same file", function testMultipleBlocks() {
		const input = `
/*??
 * [EXAMPLE] First block
 */

function test() {}

/*??
 * [GOTCHA] Second block
 */
`
		const expected = `
/*??
 | [EXAMPLE] First block
 */

function test() {}

/*??
 | [GOTCHA] Second block
 */
`
		const result = migrate(input)

		assertEquals(result.changed, true)
		assertEquals(result.text, expected)
	})

	await t.step("preserves non-Envoy block comments", function testNonEnvoyComments() {
		const input = `
/**
 * Regular JSDoc comment
 * @param x - parameter
 */
function test(x) {}

/*??
 * [EXAMPLE] Envoy block
 */
`
		const expected = `
/**
 * Regular JSDoc comment
 * @param x - parameter
 */
function test(x) {}

/*??
 | [EXAMPLE] Envoy block
 */
`
		const result = migrate(input)

		assertEquals(result.changed, true)
		// Only the Envoy block should be changed
		assertEquals(result.text, expected)
	})

	await t.step("handles blocks without category tags", function testNoCategory() {
		const input = `
/*??
 * Just a plain help text
 * without category brackets
 */
`
		const expected = `
/*??
 | Just a plain help text
 | without category brackets
 */
`
		const result = migrate(input)

		assertEquals(result.changed, true)
		assertEquals(result.text, expected)
	})

	await t.step("preserves trailing spaces", function testTrailingSpaces() {
		const input = `
/*??
 * [EXAMPLE] Line with trailing spaces
 * Another line
 */
`
		const expected = `
/*??
 | [EXAMPLE] Line with trailing spaces
 | Another line
 */
`
		const result = migrate(input)

		assertEquals(result.changed, true)
		assertEquals(result.text, expected)
	})
})

//?? [EXAMPLE] Run with: deno test scripts/codemods/migrateEnvoyPipeBlocks/migrate/index.test.ts