//++ Associates comments with their nearest function nodes
import type { RawComment } from "../../types/index.ts"
import type { FunctionNode } from "../../extractFunctions/index.ts"

export default function associateWithNodes(
	comments: Array<RawComment>,
	functions: Array<FunctionNode>,
): Array<RawComment> {
	// If there's only one function, all comments belong to it
	if (functions.length === 1) {
		const functionName = functions[0].name
		return comments.map((comment) => ({
			...comment,
			nodeId: functionName,
		}))
	}

	// If no functions, return comments as-is
	if (functions.length === 0) {
		return comments
	}

	// Multiple functions: use proximity and marker detection
	return comments.map((comment) => {
		// Check for explicit function marker: [functionName]
		const markerMatch = comment.text.match(/^\[([^\]]+)\]/)
		if (markerMatch) {
			const functionName = markerMatch[1]
			// Verify this function exists
			const functionExists = functions.some((f) => f.name === functionName)
			if (functionExists) {
				return {
					...comment,
					nodeId: functionName,
				}
			}
		}

		// No marker, use proximity
		// Find the nearest function that contains or is near this comment
		let nearestFunction: FunctionNode | null = null
		let nearestDistance = Infinity

		for (const func of functions) {
			// Comment is inside function
			if (comment.start >= func.startPos && comment.end <= func.endPos) {
				return {
					...comment,
					nodeId: func.name,
				}
			}

			// Calculate minimum distance to function
			let distance: number

			if (comment.end <= func.startPos) {
				// Comment is before function
				distance = func.startPos - comment.end
			} else if (comment.start >= func.endPos) {
				// Comment is after function
				distance = comment.start - func.endPos
			} else {
				// Comment overlaps with function somehow
				distance = 0
			}

			if (distance < nearestDistance) {
				nearestDistance = distance
				nearestFunction = func
			}
		}

		// Associate with nearest function if reasonably close
		if (nearestFunction && nearestDistance < 200) {
			return {
				...comment,
				nodeId: nearestFunction.name,
			}
		}

		// No clear association
		return comment
	})
}

//?? associateWithNodes(comments, functions) // Returns comments with nodeId set
