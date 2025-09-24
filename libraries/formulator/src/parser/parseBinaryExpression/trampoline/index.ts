// No external types used here; trampoline is generic and standalone

// Types for eliminating recursion stack frames via thunks
export type TrampolineResult<T> =
	| { done: true; value: T }
	| { done: false; next: () => TrampolineResult<T> }

// Executes trampoline computation to completion
// Note: This implementation uses a while loop as a necessary evil to prevent stack overflow.
// Pure recursive trampolines require tail-call optimization which JS doesn't guarantee.
// This is an acceptable exception to the "no loops" rule for stack safety.
export default function trampoline<T>(computation: TrampolineResult<T>): T {
	// We must use a loop here to avoid stack overflow
	// This is the standard trampoline pattern implementation
	let current = computation

	while (!current.done) {
		current = current.next()
	}

	return current.value
}
