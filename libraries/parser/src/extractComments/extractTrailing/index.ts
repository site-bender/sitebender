//++ Extracts trailing comments from a TypeScript node
import * as typescript from "npm:typescript@5.7.2"

export default function extractTrailing(sourceFile: typescript.SourceFile) {
	return function (node: typescript.Node): Array<typescript.CommentRange> {
		const fullText = sourceFile.getFullText()
		const ranges = typescript.getTrailingCommentRanges(
			fullText,
			node.getEnd(),
		)

		return ranges || []
	}
}

//?? extractTrailing(sourceFile)(functionNode) // Returns trailing comment ranges for a function
