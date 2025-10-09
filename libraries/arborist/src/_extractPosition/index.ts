import type { Position, Span } from "../types/index.ts"

//++ Extract position from span (simplified - uses byte offset as approximation)
//++ In a real implementation, we'd convert byte offset to line/column
export default function extractPosition(span: Span): Position {
	// For now, we use a simplified approach
	// In future, we could parse the source text to get accurate line/column
	return {
		line: 1,
		column: span.start,
	}
}
