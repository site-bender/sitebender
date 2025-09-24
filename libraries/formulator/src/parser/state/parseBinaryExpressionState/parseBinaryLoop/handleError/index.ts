import type { AstNode } from "../../../../../types/index.ts"

//++ Returns the left node when error occurs in binary parsing
export default function handleError(leftNode: AstNode) {
	return function (): AstNode {
		return leftNode // If error, return leftNode (shouldn't happen since we checked isError)
	}
}

//?? [EXAMPLE] handleError(leftNode)() returns leftNode
//?? [PRO] Curried function for use with fold error handling
//?? [PRO] Pure function with predictable behavior
//?? [GOTCHA] This should never be called if error checking is done properly
