//++ Extracts all comments from a TypeScript source file
import * as typescript from "npm:typescript@5.7.2"
import type { RawComment } from "../types/index.ts"
import extractLeading from "./extractLeading/index.ts"
import extractTrailing from "./extractTrailing/index.ts"

export default function extractComments(
	sourceFile: typescript.SourceFile,
): Array<RawComment> {
	const comments: Array<RawComment> = []
	const fullText = sourceFile.getFullText()
	const processedRanges = new Set<string>()

	// Helper to create unique range identifier
	function getRangeId(pos: number, end: number): string {
		return `${pos}-${end}`
	}

	// Helper to extract comment text and create RawComment
	function processCommentRange(
		range: typescript.CommentRange,
	): RawComment | null {
		const rangeId = getRangeId(range.pos, range.end)

		// Skip if already processed
		if (processedRanges.has(rangeId)) {
			return null
		}

		processedRanges.add(rangeId)

		const fullCommentText = fullText.slice(range.pos, range.end)
		const position = sourceFile.getLineAndCharacterOfPosition(range.pos)

		// Determine comment type and extract inner text
		const isLineComment =
			range.kind === typescript.SyntaxKind.SingleLineCommentTrivia
		let text: string

		if (isLineComment) {
			// Remove // and optional marker characters
			text = fullCommentText.slice(2)
			// Remove special markers like ++, --, ?? at the start
			if (text.match(/^([\+\-\?])\1/)) {
				text = text.slice(2)
			}
			text = text.trim()
		} else {
			// Remove /* */ and optional marker characters
			text = fullCommentText.slice(2, -2)
			// Remove special markers if present
			if (text.match(/^([\+\-\?])\1/)) {
				text = text.slice(2)
			}
			text = text.trim()
		}

		return {
			kind: isLineComment ? "line" : "block",
			text,
			fullText: fullCommentText,
			start: range.pos,
			end: range.end,
			line: position.line + 1, // Convert to 1-based
			column: position.character + 1, // Convert to 1-based
		}
	}

	// Traverse the AST to find all comments
	function visit(node: typescript.Node): void {
		// Get leading comments
		const leadingComments = extractLeading(sourceFile)(node)
		for (const range of leadingComments) {
			const comment = processCommentRange(range)
			if (comment) {
				comments.push(comment)
			}
		}

		// Get trailing comments
		const trailingComments = extractTrailing(sourceFile)(node)
		for (const range of trailingComments) {
			const comment = processCommentRange(range)
			if (comment) {
				comments.push(comment)
			}
		}

		// Recursively visit children
		typescript.forEachChild(node, visit)
	}

	// Start traversal from root
	visit(sourceFile)

	// Sort by position for consistent output
	return comments.sort((a, b) => a.start - b.start)
}

//?? extractComments(sourceFile) // Returns all comments from the file
//?? extractComments(parsedFile).filter(c => c.text.startsWith("++")) // Get description comments
