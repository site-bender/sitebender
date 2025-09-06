import { reactiveState, type Subscriber } from "./shared.ts"

/**
 * Create a reactive signal that holds a value and notifies dependents when it changes.
 *
 * Example:
 * const count = signal(0)
 * count.set(1)
 * console.log(count.value) // 1
 */
export default function signal<T>(initialValue: T) {
	let _value = initialValue
	const subscribers = new Set<Subscriber>()

	return {
		get value() {
			if (reactiveState.currentSubscriber) {
				subscribers.add(reactiveState.currentSubscriber)
			}
			return _value
		},
		set(newValue: T) {
			if (_value !== newValue) {
				_value = newValue
				for (const sub of subscribers) sub()
			}
		},
	}
}
