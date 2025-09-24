import { reactiveState, type Subscriber } from "./shared.ts"

/**
 * Create a computed value that tracks dependencies and recomputes lazily.
 *
 * Example:
 * const a = signal(2), b = signal(3)
 * const sum = computed(() => a.value + b.value)
 * console.log(sum.value) // 5
 */
export default function computed<T>(computeFn: () => T) {
	let _value!: T
	let _computed = false
	const subscribers = new Set<Subscriber>()

	const update: Subscriber = () => {
		if (_computed) {
			_computed = false
			for (const s of subscribers) s()
		}
	}

	const recompute = () => {
		const prev = reactiveState.currentSubscriber
		reactiveState.currentSubscriber = update
		try {
			_value = computeFn()
			_computed = true
		} finally {
			reactiveState.currentSubscriber = prev
		}
	}

	return {
		get value() {
			if (reactiveState.currentSubscriber) {
				subscribers.add(reactiveState.currentSubscriber)
			}
			if (!_computed) recompute()
			return _value
		},
	}
}
