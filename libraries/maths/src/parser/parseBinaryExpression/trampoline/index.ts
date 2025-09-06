import type { ASTNode, ParseError, Result } from "../../../types/index.ts"

/**
 * Trampoline types for eliminating recursion stack frames
 */
export type TrampolineResult<T> = 
	| { done: true; value: T }
	| { done: false; next: () => TrampolineResult<T> }

/**
 * Executes trampoline computation to completion
 * @param computation - Initial trampoline computation
 * @returns Final result after all bouncing
 */
export default function trampoline<T>(computation: TrampolineResult<T>): T {
	const stack = [computation]
	
	while (stack.length > 0) {
		const current = stack.pop()!
		
		if (current.done) {
			if (stack.length === 0) {
				return current.value
			}
			// This shouldn't happen in our usage, but handle gracefully
			continue
		}
		
		// Get next computation
		stack.push(current.next())
	}
	
	// This should never be reached
	throw new Error("Trampoline completed without result")
}