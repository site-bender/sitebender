// @sitebender/arborist/src/extractComments
// Extracts all comments from source text using Validation monad for error accumulation

import type { Validation } from "~libraries/toolsmith/src/types/validation/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

import type {
	EnvoyMarker,
	ParsedAst,
	ParsedComment,
	Position,
	Span,
} from "../types/index.ts"
import type { CommentExtractionError } from "../types/errors/index.ts"

//++ Pattern to match line comments (// ...)
const LINE_COMMENT_PATTERN = /\/\/(.*)$/gm

//++ Pattern to match block comments (/* ... */)
const BLOCK_COMMENT_PATTERN = /\/\*[\s\S]*?\*\//gm

//++ Detects Envoy marker from comment text
//++ Returns EnvoyMarker if found, undefined otherwise
function detectEnvoyMarker(text: string): EnvoyMarker | undefined {
	const trimmed = text.trim()

	if (trimmed.startsWith("++")) {
		return {
			marker: "++",
			description: trimmed.slice(2).trim(),
		}
	}

	if (trimmed.startsWith("--")) {
		return {
			marker: "--",
			techDebt: trimmed.slice(2).trim(),
		}
	}

	if (trimmed.startsWith("!!")) {
		return {
			marker: "!!",
			critical: trimmed.slice(2).trim(),
		}
	}

	if (trimmed.startsWith("??")) {
		return {
			marker: "??",
			help: trimmed.slice(2).trim(),
		}
	}

	if (trimmed.startsWith(">>")) {
		return {
			marker: ">>",
			link: trimmed.slice(2).trim(),
		}
	}

	return undefined
}

//++ Calculates line and column from byte offset in source text
//++ Returns Position with 1-based line and column numbers
function calculatePosition(sourceText: string, offset: number): Position {
	const beforeOffset = sourceText.slice(0, offset)
	const lines = beforeOffset.split("\n")
	const line = lines.length
	const column = lines[lines.length - 1].length

	return {
		line,
		column,
	}
}

//++ Extracts all comments from a ParsedAst
//++ Returns Validation to accumulate extraction errors
//++ Extracts raw comments without interpretation (Envoy handles interpretation)
//++ Detects Envoy markers (++, --, !!, ??, >>)
//++ Note: SWC WASM doesn't expose comments in AST, so we parse from sourceText
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

			const position = calculatePosition(sourceText, offset)
			const span: Span = {
				start: offset,
				end: offset + fullMatch.length,
			}

			const envoyMarker = detectEnvoyMarker(commentText)

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

			const position = calculatePosition(sourceText, offset)
			const span: Span = {
				start: offset,
				end: offset + fullMatch.length,
			}

			const envoyMarker = detectEnvoyMarker(commentText)

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
	const allComments = [...lineComments, ...blockComments]
	const sortedComments = reduce(
		function insertSorted(
			acc: ReadonlyArray<ParsedComment>,
			comment: ParsedComment,
		): ReadonlyArray<ParsedComment> {
			// Find insertion point to maintain sort order by start position
			const insertIndex = acc.findIndex(
				function isAfter(c: ParsedComment): boolean {
					return c.span.start > comment.span.start
				},
			)

			if (insertIndex === -1) {
				return [...acc, comment]
			}

			return [
				...acc.slice(0, insertIndex),
				comment,
				...acc.slice(insertIndex),
			]
		},
	)([] as ReadonlyArray<ParsedComment>)(allComments)

	return success(sortedComments)
}
