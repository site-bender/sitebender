//++ Calculates line and column from byte offset in source text
//++ Returns Position with 1-based line and column numbers
import type { Position } from "../../types/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

export default function calculatePosition(sourceText: string, offset: number): Position {
	const beforeOffset = sourceText.slice(0, offset)
	const lines = beforeOffset.split("\n")
	const line = getOrElse(0)(length(lines))
	const column = lines[getOrElse(0)(length(lines)) - 1].length

	return {
		line,
		column,
	}
}
