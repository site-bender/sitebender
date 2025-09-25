import find from "../../../../toolsmith/src/vanilla/array/find/index.ts"

type Comment = {
	kind: "line" | "block"
	text: string
	fullText: string
	type: "description" | "example" | "gotcha" | "pro" | "law"
	position: "before" | "after"
}

//++ Extracts description from parsed comments using Arborist API output
export default function extractDescription(
	comments: Array<Comment>,
): string | undefined {
	// Find the first comment that is a description positioned before the function
	const descriptionComment = find(
		function isDescriptionComment(comment: Comment) {
			return comment.type === "description" && comment.position === "before"
		},
	)(comments)

	return descriptionComment?.text
}
