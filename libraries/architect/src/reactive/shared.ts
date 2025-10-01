//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Subscriber = () => void

export const reactiveState = {
	currentSubscriber: null as Subscriber | null,
}
