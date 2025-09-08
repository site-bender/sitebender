/// <reference lib="deno.ns" />
/// <reference lib="dom" />
import { assertEquals, assert } from "https://deno.land/std@0.218.0/assert/mod.ts"
import parseCommentMarkers from "./index.ts"

Deno.test("parseCommentMarkers - single-line description (subsequent lines now stray)", () => {
  const src = `//++ Adds two numbers\n//++ Pure and curried\nexport const add = (x: number) => (y: number) => x + y`
  const result = parseCommentMarkers(src)
  assertEquals(result.description, "Adds two numbers")
  assertEquals(result.examples.length, 0)
  assertEquals(result.techDebt.length, 0)
  assertEquals(result.diagnostics.length, 1)
  assert(result.diagnostics[0].issue.includes("Extra //++"))
})

Deno.test("parseCommentMarkers - multi-line description block", () => {
  const src = `/*++\n Multi-line description line one\n line two here\n*/\nfunction f() {}`
  const result = parseCommentMarkers(src)
  assert(result.description?.includes("line one"))
  assert(result.description?.includes("line two"))
  assertEquals(result.diagnostics.length, 0)
})

Deno.test("parseCommentMarkers - single-line example", () => {
  const src = `//++ Desc\n//?? add(1,2) // 3\nfunction add(a:number,b:number){return a+b}`
  const r = parseCommentMarkers(src)
  assertEquals(r.examples.length, 1)
  assertEquals(r.examples[0].code, "add(1,2)")
  assertEquals(r.examples[0].expected, "3")
})

Deno.test("parseCommentMarkers - multi-line example block", () => {
  const src = `//++ Desc\n/*??\nadd(1,2) // 3\nadd(2,2) // 4\n*/\nexport const x = 1`
  const r = parseCommentMarkers(src)
  assertEquals(r.examples.length, 2)
  assertEquals(r.examples.map(e => e.expected), ["3", "4"])
})

Deno.test("parseCommentMarkers - tech debt with and without reason", () => {
  const src = `//++ Desc\n//-- Needs refactor\n//--   \nfunction t(){}`
  const r = parseCommentMarkers(src)
  assertEquals(r.techDebt.length, 2)
  assertEquals(r.techDebt[0].reason, "Needs refactor")
  // Second empty reason should yield diagnostic
  assertEquals(r.diagnostics.length, 1)
  assert(r.diagnostics[0].issue.includes("Empty tech debt"))
})

Deno.test("parseCommentMarkers - stray extra //++ yields diagnostic", () => {
  const src = `//++ Primary\n//++ Stray\nfunction x(){}`
  const r = parseCommentMarkers(src)
  assertEquals(r.description, "Primary")
  assertEquals(r.diagnostics.length, 1)
  assert(r.diagnostics[0].issue.includes("Extra //++"))
})

Deno.test("parseCommentMarkers - unterminated description block diagnostic", () => {
  const src = `/*++\n not closed\nfunction x(){}`
  const r = parseCommentMarkers(src)
  assertEquals(r.description, undefined)
  assertEquals(r.diagnostics.length, 1)
  assert(r.diagnostics[0].issue.includes("Unterminated"))
})
