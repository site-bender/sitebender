import type { Span } from "../types/index.ts"

//++ Extract span from import node
export default function extractSpan(node: Record<string, unknown>): Span {
	const spanObj = node.span as Record<string, number> | undefined
	return {
		start: spanObj?.start ?? 0,
		end: spanObj?.end ?? 0,
	}
}
