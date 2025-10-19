import type { Span, SwcSpan } from "../types/index.ts"

//++ Extract span from AST node
//++ Nodes may have optional span property with start/end byte offsets
export default function _extractSpan(node: Readonly<{ span?: SwcSpan }>): Span {
	return {
		start: node.span?.start ?? 0,
		end: node.span?.end ?? 0,
	}
}
