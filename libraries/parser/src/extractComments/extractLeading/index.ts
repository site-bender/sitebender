//++ Extracts leading comments from a TypeScript node
import * as typescript from "npm:typescript@5.7.2"

export default function extractLeading(sourceFile: typescript.SourceFile) {
	return function (node: typescript.Node): Array<typescript.CommentRange> {
		const fullText = sourceFile.getFullText()
		const ranges = typescript.getLeadingCommentRanges(
			fullText,
			node.getFullStart(),
		)

		return ranges || []
	}
}

//?? extractLeading(sourceFile)(functionNode) // Returns leading comment ranges for a function
