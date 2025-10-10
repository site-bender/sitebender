//++ Calculates line and column from byte offset in source text
//++ Returns Position with 1-based line and column numbers
import type { Position } from "../../types/index.ts"

export default function calculatePosition(sourceText: string, offset: number): Position {
	const beforeOffset = sourceText.slice(0, offset)
	const lines = beforeOffset.split("\n")
	const line = lines.length
	const column = lines[lines.length - 1].length

	return {
		line,
		column,
	}
}
