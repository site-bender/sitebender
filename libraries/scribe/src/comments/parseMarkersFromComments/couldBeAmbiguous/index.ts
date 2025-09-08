//++ Heuristic: are there mixed associated + unassociated comments across multiple functions?
import { RawComment } from '../types/index.ts'

export default function couldBeAmbiguous(comments: Array<RawComment>): boolean {
	const withNode = new Set(comments.filter(c => c.nodeId).map(c => c.nodeId))
	const anyWithout = comments.some(c => !c.nodeId)
	return withNode.size > 1 && anyWithout
}
