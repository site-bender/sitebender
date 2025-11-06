import type { ParsedComment } from "../../../types/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

function _findInsertIndexRecursive(
	accumulator: ReadonlyArray<ParsedComment>,
	comment: ParsedComment,
	currentIndex: number,
	accumulatorLength: number,
): number {
	// Base case: reached end of array
	if (currentIndex >= accumulatorLength) {
		return -1
	}

	// If this element's span.start > comment.span.start, return this index
	if (accumulator[currentIndex].span.start > comment.span.start) {
		return currentIndex
	}

	// Recurse to next index
	return _findInsertIndexRecursive(
		accumulator,
		comment,
		currentIndex + 1,
		accumulatorLength,
	)
}

export default function _findInsertIndex(
	accumulator: ReadonlyArray<ParsedComment>,
	comment: ParsedComment,
): number {
	const accumulatorLength = getOrElse(0)(length(accumulator))
	return _findInsertIndexRecursive(accumulator, comment, 0, accumulatorLength)
}
