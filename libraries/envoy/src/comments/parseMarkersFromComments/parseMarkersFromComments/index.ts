import type { ParsedMarkerResult, RawComment } from "../types/index.ts"

import classifyMarker from "../classifyMarker/index.ts"
//++ Adapt RawComment[] into description/examples/techDebt + diagnostics (immutable accumulation)
import { DIAGNOSTIC } from "../constants/index.ts"
import couldBeAmbiguous from "../couldBeAmbiguous/index.ts"

export default function parseMarkersFromComments(
	comments: Array<RawComment>,
): ParsedMarkerResult {
	return comments.reduce<ParsedMarkerResult>((acc, c) => {
		const markerType = classifyMarker(c.fullText)
		if (!markerType) {
			return (!c.nodeId && couldBeAmbiguous(comments))
				? {
					...acc,
					diagnostics: [...acc.diagnostics, {
						code: DIAGNOSTIC.AMBIGUOUS_COMMENT,
						category: "association",
						message: "Unassociated comment in potential multi-function context",
						line: c.line,
						column: c.column,
						severity: "info",
					}],
				}
				: acc
		}
		if (markerType.kind === "description") {
			return acc.description
				? {
					...acc,
					diagnostics: [...acc.diagnostics, {
						code: DIAGNOSTIC.EXTRA_DESCRIPTION,
						category: "structure",
						message: "Extra description marker ignored",
						line: c.line,
						column: c.column,
						functionName: c.nodeId,
						severity: "warn",
						suggestion: "Remove or merge with primary description",
					}],
				}
				: { ...acc, description: markerType.value }
		}
		if (markerType.kind === "example") {
			const newExamples = markerType.examples.map((ex) => ({
				...ex,
				line: c.line,
				functionName: c.nodeId,
			}))
			return markerType.examples.length === 0
				? {
					...acc,
					diagnostics: [...acc.diagnostics, {
						code: DIAGNOSTIC.EMPTY_EXAMPLE_BLOCK,
						category: "quality",
						message: "Empty example block",
						line: c.line,
						column: c.column,
						severity: "info",
					}],
				}
				: { ...acc, examples: [...acc.examples, ...newExamples] }
		}
		// techDebt
		const reason = markerType.reason.trim()
		const newTech = {
			line: c.line,
			raw: reason,
			reason,
			functionName: c.nodeId,
		}
		return reason ? { ...acc, techDebt: [...acc.techDebt, newTech] } : {
			...acc,
			techDebt: [...acc.techDebt, newTech],
			diagnostics: [...acc.diagnostics, {
				code: DIAGNOSTIC.EMPTY_TECHDEBT,
				category: "quality",
				message: "Empty tech debt reason",
				line: c.line,
				column: c.column,
				functionName: c.nodeId,
				severity: "warn",
				suggestion: "Provide a concise justification after //--",
			}],
		}
	}, { description: undefined, examples: [], techDebt: [], diagnostics: [] })
}
