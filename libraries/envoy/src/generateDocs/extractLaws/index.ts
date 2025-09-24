import type { ParsedComment } from "../../types/index.ts"

//++ Extract laws from Linguist comments
export default function extractLaws(comments: ReadonlyArray<ParsedComment>) {
	return comments.filter((c) => c.type === "law").map((c) => ({
		name: c.text.split(":")[0] || "Law",
		description: c.text,
	}))
}
