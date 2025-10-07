import { reactiveState, type Subscriber } from "./shared.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
