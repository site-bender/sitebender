/// <reference lib="deno.ns" />
import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts"

import type { RawComment } from "./types/index.ts"

import { DIAGNOSTIC } from "./constants/index.ts"
import parseMarkersFromComments from "./parseMarkersFromComments/index.ts"

function rc(partial: Partial<RawComment> & { fullText: string }): RawComment {
	return {
		kind: partial.kind ?? "line",
		text: partial.text ?? deriveText(partial.fullText),
		fullText: partial.fullText,
		start: partial.start ?? 0,
		end: partial.end ?? partial.fullText.length,
		line: partial.line ?? 1,
		column: partial.column ?? 1,
		nodeId: partial.nodeId,
	}
}

function deriveText(full: string): string {
	if (full.startsWith("//")) return full.replace(/^\/\/[+?\-]{2}?/, "").trim()
	if (full.startsWith("/*")) {
		return full.replace(/^\/\*[+?\-]{2}?/, "").replace(/\*\/$/, "").trim()
	}
	return full
}

Deno.test("parseMarkersFromComments - captures first description only", () => {
	const comments = [
		rc({ fullText: "//++ Primary description", line: 1 }),
		rc({ fullText: "//++ Extra line", line: 2 }),
	]
	const r = parseMarkersFromComments(comments)
	assertEquals(r.description, "Primary description")
	const extra = r.diagnostics.find((d) =>
		d.code === DIAGNOSTIC.EXTRA_DESCRIPTION
	)
	assert(extra)
})

Deno.test("parseMarkersFromComments - examples single + block", () => {
	const comments = [
		rc({ fullText: "//?? add(1,2) // 3", line: 3 }),
		rc({
			fullText: "/*??\nadd(2,2) // 4\nadd(3,3) // 6\n*/",
			line: 4,
			kind: "block",
		}),
	]
	const r = parseMarkersFromComments(comments)
	assertEquals(r.examples.length, 3)
	assertEquals(r.examples.map((e) => e.expected), ["3", "4", "6"])
})

Deno.test("parseMarkersFromComments - tech debt reason + empty", () => {
	const comments = [
		rc({ fullText: "//-- Needs refactor soon", line: 5 }),
		rc({ fullText: "//--   ", line: 6 }),
	]
	const r = parseMarkersFromComments(comments)
	assertEquals(r.techDebt.length, 2)
	const empty = r.diagnostics.find((d) => d.code === DIAGNOSTIC.EMPTY_TECHDEBT)
	assert(empty)
})

Deno.test("parseMarkersFromComments - ambiguous comment detection heuristic", () => {
	const comments = [
		rc({ fullText: "//++ A", line: 1, nodeId: "fnA" }),
		rc({ fullText: "// random note", line: 2 }),
		rc({ fullText: "//++ B", line: 10, nodeId: "fnB" }),
	]
	const r = parseMarkersFromComments(comments)
	const amb = r.diagnostics.find((d) => d.code === DIAGNOSTIC.AMBIGUOUS_COMMENT)
	assert(amb)
})
