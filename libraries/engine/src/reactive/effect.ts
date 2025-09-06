import { reactiveState } from "./shared.ts"

/**
 * Create a reactive effect that re-runs when its dependencies change.
 * Returns a cleanup function (noop in MVP).
 *
 * @example
 * ```typescript
 * const count = signal(0)
 * effect(() => {
 *   console.log('Count is:', count.value)
 * })
 * count.set(1) // logs "Count is: 1"
 * ```
 */
export default function effect(fn: () => void): () => void {
	const run = () => {
		const prev = reactiveState.currentSubscriber
		reactiveState.currentSubscriber = run
		try {
			fn()
		} finally {
			reactiveState.currentSubscriber = prev
		}
	}
	run()
	return () => {}
}
