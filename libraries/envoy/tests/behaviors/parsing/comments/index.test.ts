import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"

import parseCommentMarkers from "../../../../src/comments/parseCommentMarkers/index.ts"

Deno.test("parseCommentMarkers - extracts contiguous //++ lines as description", () => {
	const src = `//++ First line
//++ second line detail
export function add(a: number, b: number) { return a + b }`
	const parsed = parseCommentMarkers(src)
	assertEquals(parsed.description, "First line second line detail")
	assertEquals(parsed.help.length, 0)
})

Deno.test("parseCommentMarkers - captures single-line example with expected", () => {
	const src = `//++ add numbers
export function add(a: number, b: number) { return a + b }
//?? add(2,3) // 5`
	const parsed = parseCommentMarkers(src)
	assertEquals(parsed.help.length, 1)
	assertEquals(parsed.help[0].code, "add(2,3)")
	assertEquals(parsed.help[0].expected, "5")
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
	assertEquals(parsed.help.length, 2)
	assertEquals(parsed.help[0].expected, "2")
	assertEquals(parsed.help[1].code, "inc(5)")
})

Deno.test("parseCommentMarkers - extra stray //++ after description flagged", () => {
	const src = `//++ primary
export function a(){ return 1 }
//++ stray later`
	const parsed = parseCommentMarkers(src)
	assertEquals(parsed.diagnostics.length, 1)
	assert(parsed.diagnostics[0].issue.includes("Extra //++"))
})
