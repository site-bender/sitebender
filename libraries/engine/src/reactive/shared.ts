/**
 * Shared reactive state.
 * Internal only; modules coordinate via this object to avoid global pollution.
 */
export type Subscriber = () => void

export const reactiveState = {
	currentSubscriber: null as Subscriber | null,
}
