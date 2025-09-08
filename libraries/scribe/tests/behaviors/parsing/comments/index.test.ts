import { assertEquals, assert } from "https://deno.land/std@0.218.0/assert/mod.ts"
import parseCommentMarkers from "../../../../src/comments/parseCommentMarkers/index.ts"

Deno.test("parseCommentMarkers - extracts contiguous //++ lines as description", () => {
	const src = `//++ First line
//++ second line detail
export function add(a: number, b: number) { return a + b }`
	const parsed = parseCommentMarkers(src)
	assertEquals(parsed.description, "First line second line detail")
	assertEquals(parsed.examples.length, 0)
})

Deno.test("parseCommentMarkers - captures single-line example with expected", () => {
	const src = `//++ add numbers
export function add(a: number, b: number) { return a + b }
//?? add(2,3) // 5`
	const parsed = parseCommentMarkers(src)
	assertEquals(parsed.examples.length, 1)
	assertEquals(parsed.examples[0].code, "add(2,3)")
	assertEquals(parsed.examples[0].expected, "5")
})

Deno.test("parseCommentMarkers - parses tech debt lines", () => {
	const src = `//++ desc
export function foo(x: number) { //-- using mutation for perf
 return x + 1 }`
	const parsed = parseCommentMarkers(src)
	assertEquals(parsed.techDebt.length, 1)
	assert(parsed.techDebt[0].reason.includes("mutation"))
})

Deno.test("parseCommentMarkers - multiline /*++ block", () => {
	const src = `/*++
 Multi line
 Description here
*/
export function id<T>(x: T){ return x }`
	const parsed = parseCommentMarkers(src)
	assertEquals(parsed.description, "Multi line Description here")
})

Deno.test("parseCommentMarkers - multi-line examples block", () => {
	const src = `//++ ex samples
export function inc(x: number){ return x+1 }
/*?? inc(1) // 2
 inc(5) // 6
*/`
	const parsed = parseCommentMarkers(src)
	assertEquals(parsed.examples.length, 2)
	assertEquals(parsed.examples[0].expected, "2")
	assertEquals(parsed.examples[1].code, "inc(5)")
})

Deno.test("parseCommentMarkers - extra stray //++ after description flagged", () => {
	const src = `//++ primary
export function a(){ return 1 }
//++ stray later`
	const parsed = parseCommentMarkers(src)
	assertEquals(parsed.diagnostics.length, 1)
	assert(parsed.diagnostics[0].issue.includes("Extra //++"))
})
import { assertEquals, assert } from "https://deno.land/std@0.218.0/assert/mod.ts"
import parseCommentMarkers from "../../../../src/comments/parseCommentMarkers/index.ts"

Deno.test("parseCommentMarkers - extracts contiguous //++ lines as description", () => {
\tconst src = `//++ First line\n//++ second line detail\nexport function add(a: number, b: number) { return a + b }`\n\tconst parsed = parseCommentMarkers(src)\n\tassertEquals(parsed.description, "First line second line detail")\n\tassertEquals(parsed.examples.length, 0)\n})

Deno.test("parseCommentMarkers - captures single-line example with expected", () => {
\tconst src = `//++ add numbers\nexport function add(a: number, b: number) { return a + b }\n//?? add(2,3) // 5`\n\tconst parsed = parseCommentMarkers(src)\n\tassertEquals(parsed.examples.length, 1)\n\tassertEquals(parsed.examples[0].code, "add(2,3)")\n\tassertEquals(parsed.examples[0].expected, "5")\n})

Deno.test("parseCommentMarkers - parses tech debt lines", () => {
\tconst src = `//++ desc\nexport function foo(x: number) { //-- using mutation for perf\n return x + 1 }`\n\tconst parsed = parseCommentMarkers(src)\n\tassertEquals(parsed.techDebt.length, 1)\n\tassert(parsed.techDebt[0].reason.includes("mutation"))\n})

Deno.test("parseCommentMarkers - multiline /*++ block", () => {
\tconst src = `/*++\n Multi line\n Description here\n*/\nexport function id<T>(x: T){ return x }`\n\tconst parsed = parseCommentMarkers(src)\n\tassertEquals(parsed.description, "Multi line Description here")\n})

Deno.test("parseCommentMarkers - multi-line examples block", () => {
\tconst src = `//++ ex samples\nexport function inc(x: number){ return x+1 }\n/*?? inc(1) // 2\n inc(5) // 6\n*/`\n\tconst parsed = parseCommentMarkers(src)\n\tassertEquals(parsed.examples.length, 2)\n\tassertEquals(parsed.examples[0].expected, "2")\n\tassertEquals(parsed.examples[1].code, "inc(5)")\n})

Deno.test("parseCommentMarkers - extra stray //++ after description flagged", () => {
\tconst src = `//++ primary\nexport function a(){ return 1 }\n//++ stray later`\n\tconst parsed = parseCommentMarkers(src)\n\tassertEquals(parsed.diagnostics.length, 1)\n\tassert(parsed.diagnostics[0].issue.includes("Extra //++"))\n})
