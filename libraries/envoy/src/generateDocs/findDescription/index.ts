import type { ParsedComments } from "../../comments/parseCommentMarkers/types/index.ts"
import type { ParsedComment } from "../../types/index.ts"

//++ Find the main description from comment markers or Arborist comments
export default function findDescription(
	commentMarkers: ParsedComments,
	comments: ReadonlyArray<ParsedComment>,
): string {
	return commentMarkers.description ||
		comments.find((c) => c.type === "description")?.text ||
		""
}
