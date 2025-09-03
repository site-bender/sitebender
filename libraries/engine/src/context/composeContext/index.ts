import type { Bus } from "../../../types/bus/index.ts"
import type { LocalValues } from "../../types/index.ts"

import createBroadcastBus from "../../runtime/bus/createBroadcastBus/index.ts"
import createLocalBus from "../../runtime/bus/createLocalBus/index.ts"

export type ComposeContext = {
	v: 1
	env: "server" | "client"
	signal?: AbortSignal
	now: () => number
	bus: Bus
	logger?: {
		debug: (...args: unknown[]) => void
		error: (...args: unknown[]) => void
	}
	/** Optional per-request/local evaluation values (e.g., auth user, claims) */
	localValues?: LocalValues
}

type Init = Partial<Omit<ComposeContext, "v" | "env" | "now" | "bus">> & {
	env?: ComposeContext["env"]
	now?: () => number
	busMode?: "local" | "broadcast" // default local; broadcast is opt-in
}

export default function createComposeContext(init?: Init): ComposeContext {
	const env: ComposeContext["env"] = typeof window === "undefined"
		? "server"
		: (init?.env ?? "client")
	const now = (init && "now" in init && init.now)
		? init.now
		: (() => Date.now())
	const bus: Bus = env === "client"
		? ((init?.busMode ?? "local") === "broadcast"
			? createBroadcastBus("sitebender", "broadcast")
			: createLocalBus(document, "local"))
		: ({ publish: () => {}, subscribe: () => () => {} } as Bus)
	return {
		v: 1,
		env,
		signal: init?.signal,
		now,
		bus,
		logger: init?.logger,
		localValues: init?.localValues,
	}
}
