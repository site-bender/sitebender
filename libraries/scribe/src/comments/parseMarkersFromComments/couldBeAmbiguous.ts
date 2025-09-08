import { RawComment } from "./types.ts"

export default function couldBeAmbiguous(comments: RawComment[]): boolean {
	const withNode = new Set(
		comments.filter((c) => c.nodeId).map((c) => c.nodeId),
	)
	const anyWithout = comments.some((c) => !c.nodeId)
	return withNode.size > 1 && anyWithout
}
