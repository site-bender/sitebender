//++ Public entry: legacy line-based marker parser (delegates to processLines)
import type { ParsedComments } from "./types/index.ts"

import processLines from "./processLines/index.ts"

export default function parseCommentMarkers(source: string): ParsedComments {
	const lines = source.split(/\r?\n/)
	const final = processLines()({
		idx: 0,
		descriptionParts: [],
		haveDescription: false,
		help: [],
		techDebt: [],
		raw: [],
		diagnostics: [],
	})(lines)
	const description = final.descriptionParts.length
		? final.descriptionParts.join(" ").replace(/\s+/g, " ").trim()
		: undefined
	return {
		description,
		help: [...final.help],
		techDebt: [...final.techDebt],
		raw: [...final.raw],
		diagnostics: [...final.diagnostics],
	}
}
