import type { AstNode } from "../../../../../types/index.ts"

//++ Returns the left node when error occurs in binary parsing
export default function handleError(leftNode: AstNode) {
	return function (): AstNode {
		return leftNode // If error, return leftNode (shouldn't happen since we checked isError)
	}
}
