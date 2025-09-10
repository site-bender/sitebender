import classifyMarker from "./classifyMarker.ts"
import couldBeAmbiguous from "./couldBeAmbiguous.ts"
import { DIAGNOSTIC, ParsedMarkerResult, RawComment } from "./types.ts"

const FIRST_DESCRIPTION_TAKEN = (existing?: string) => Boolean(existing)

export default function parseMarkersFromComments(
	comments: RawComment[],
): ParsedMarkerResult {
	return comments.reduce<ParsedMarkerResult>((acc, c) => {
		const markerType = classifyMarker(c.fullText)
		if (!markerType) {
			if (!c.nodeId && couldBeAmbiguous(comments)) {
				acc.diagnostics.push({
					code: DIAGNOSTIC.AMBIGUOUS_COMMENT,
					category: "association",
					message: "Unassociated comment in potential multi-function context",
					line: c.line,
					column: c.column,
					severity: "info",
				})
			}
			return acc
		}
		switch (markerType.kind) {
			case "description": {
				if (FIRST_DESCRIPTION_TAKEN(acc.description)) {
					acc.diagnostics.push({
						code: DIAGNOSTIC.EXTRA_DESCRIPTION,
						category: "structure",
						message: "Extra description marker ignored",
						line: c.line,
						column: c.column,
						functionName: c.nodeId,
						severity: "warn",
						suggestion: "Remove or merge with primary description",
					})
				} else {
					acc.description = markerType.value
				}
				return acc
			}
			case "example": {
				markerType.examples.forEach((ex) =>
					acc.examples.push({
						...ex,
						line: c.line,
						functionName: c.nodeId,
					})
				)
				if (markerType.examples.length === 0) {
					acc.diagnostics.push({
						code: DIAGNOSTIC.EMPTY_EXAMPLE_BLOCK,
						category: "quality",
						message: "Empty example block",
						line: c.line,
						column: c.column,
						severity: "info",
					})
				}
				return acc
			}
			case "techDebt": {
				const reason = markerType.reason.trim()
				acc.techDebt.push({
					line: c.line,
					raw: reason,
					reason,
					functionName: c.nodeId,
				})
				if (!reason) {
					acc.diagnostics.push({
						code: DIAGNOSTIC.EMPTY_TECHDEBT,
						category: "quality",
						message: "Empty tech debt reason",
						line: c.line,
						column: c.column,
						functionName: c.nodeId,
						severity: "warn",
						suggestion: "Provide a concise justification after //--",
					})
				}
				return acc
			}
		}
	}, { description: undefined, examples: [], techDebt: [], diagnostics: [] })
}
