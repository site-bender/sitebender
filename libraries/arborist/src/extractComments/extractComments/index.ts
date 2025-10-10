//++ Extracts all comments from a ParsedAst
//++ Returns Validation to accumulate extraction errors
//++ Extracts raw comments without interpretation (Envoy handles interpretation)
//++ Detects Envoy markers (++, --, !!, ??, >>)
//++ Note: SWC WASM doesn't expose comments in AST, so we parse from sourceText
import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

import type {
	EnvoyMarker,
	ParsedAst,
	ParsedComment,
	Position,
	Span,
} from "../../types/index.ts"
import type { CommentExtractionError } from "../../types/errors/index.ts"

import _detectEnvoyMarker from "../_detectEnvoyMarker/index.ts"
import _calculatePosition from "../_calculatePosition/index.ts"

//++ Pattern to match line comments (// ...)
const LINE_COMMENT_PATTERN = /\/\/(.*)$/gm

//++ Pattern to match block comments (/* ... */)
const BLOCK_COMMENT_PATTERN = /\/\*[\s\S]*?\*\//gm

export default function extractComments(
	ast: ParsedAst,
): Validation<CommentExtractionError, ReadonlyArray<ParsedComment>> {
	const { sourceText } = ast

	// Extract line comments
	const lineMatches = [...sourceText.matchAll(LINE_COMMENT_PATTERN)]
	const lineComments = map(
		function extractLineComment(match: RegExpMatchArray): ParsedComment {
			const fullMatch = match[0]
			const commentText = match[1]
			const offset = match.index ?? 0

			const position = _calculatePosition(sourceText, offset)
			const span: Span = {
				start: offset,
				end: offset + fullMatch.length,
			}

			const envoyMarker = _detectEnvoyMarker(commentText)

			return {
				text: commentText,
				position,
				span,
				kind: "line",
				envoyMarker,
			}
		},
	)(lineMatches)

	// Extract block comments
	const blockMatches = [...sourceText.matchAll(BLOCK_COMMENT_PATTERN)]
	const blockComments = map(
		function extractBlockComment(match: RegExpMatchArray): ParsedComment {
			const fullMatch = match[0]
			const offset = match.index ?? 0

			// Remove /* and */ delimiters
			const commentText = fullMatch.slice(2, -2)

			const position = _calculatePosition(sourceText, offset)
			const span: Span = {
				start: offset,
				end: offset + fullMatch.length,
			}

			const envoyMarker = _detectEnvoyMarker(commentText)

			return {
				text: commentText,
				position,
				span,
				kind: "block",
				envoyMarker,
			}
		},
	)(blockMatches)

	// Combine and sort by position
	const lineCommentsArray = getOrElse([] as ReadonlyArray<ParsedComment>)(
		lineComments,
	)
	const blockCommentsArray = getOrElse([] as ReadonlyArray<ParsedComment>)(
		blockComments,
	)
	const allComments = [...lineCommentsArray, ...blockCommentsArray]

	const sortedCommentsResult = reduce(
		function insertSorted(accumulator: ReadonlyArray<ParsedComment>) {
			return function insertSortedWithAccumulator(
				comment: ParsedComment,
			): ReadonlyArray<ParsedComment> {
				// Find insertion point to maintain sort order by start position
				const insertIndex = accumulator.findIndex(
					function isAfter(c: ParsedComment): boolean {
						return c.span.start > comment.span.start
					},
				)

				if (isEqual(insertIndex)(-1)) {
					return [...accumulator, comment]
				}

				return [
					...accumulator.slice(0, insertIndex),
					comment,
					...accumulator.slice(insertIndex),
				]
			}
		},
	)([] as ReadonlyArray<ParsedComment>)(allComments)

	const sortedComments = getOrElse([] as ReadonlyArray<ParsedComment>)(
		sortedCommentsResult,
	)

	return success(sortedComments)
}
