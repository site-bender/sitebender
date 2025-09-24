//++ [GROUP] State store type definitions

//++ Function type for subscribing to state changes
export type Subscriber<S> = (state: Readonly<S>) => void

//++ Function type for unsubscribing from state changes
export type Unsubscribe = () => void

//++ Store interface for reactive state management
export type Store<S> = {
	get: () => Readonly<S>
	set: (updater: S | ((prev: Readonly<S>) => S)) => void
	subscribe: (
		fn: Subscriber<S>,
		options?: { emitImmediately?: boolean },
	) => Unsubscribe
}

//++ [END]