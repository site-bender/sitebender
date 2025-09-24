import type { ParsedComments } from "../../comments/parseCommentMarkers/types/index.ts"
import type { ParsedComment } from "../../types/index.ts"

//++ Extract examples from comment markers and Linguist comments
export default function extractExamples(
	commentMarkers: ParsedComments,
	comments: ReadonlyArray<ParsedComment>,
) {
	const exampleHelp = commentMarkers.help.filter((h) =>
		h.category === "EXAMPLE"
	).map((h) => ({
		code: h.content,
		source: "envoy" as const,
	}))

	const parserExamples = comments.filter((c) => c.type === "example").map(
		(c) => ({
			code: c.text,
			source: "parser" as const,
		}),
	)

	return [...exampleHelp, ...parserExamples]
}
