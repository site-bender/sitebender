import { reactiveState } from "./shared.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
