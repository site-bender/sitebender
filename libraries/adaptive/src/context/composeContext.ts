import type { Bus } from "../../types/bus/index.ts"
import createBroadcastBus from "../runtime/bus/createBroadcastBus/index.ts"
import createLocalBus from "../runtime/bus/createLocalBus/index.ts"

export type ComposeContext = {
  v: 1
  env: 'server' | 'client'
  signal?: AbortSignal
  now: () => number
  bus: Bus
  logger?: { debug: (...args: unknown[]) => void; error: (...args: unknown[]) => void }
}

type Init = Partial<Omit<ComposeContext, 'v' | 'env' | 'now' | 'bus'>> & {
  env?: ComposeContext['env']
  now?: () => number
  busMode?: 'local' | 'broadcast' // default local; broadcast is opt-in
}

export function createComposeContext(init?: Init) : ComposeContext {
  const env: ComposeContext['env'] = typeof window === 'undefined' ? 'server' : (init?.env ?? 'client')
  const now = (init && 'now' in init && init.now) ? init.now : (() => Date.now())
  let bus: Bus
  if (env === 'client') {
    const mode = init?.busMode ?? 'local'
    bus = mode === 'broadcast' ? createBroadcastBus('sitebender', 'broadcast') : createLocalBus(document, 'local')
  } else {
    // server: noop bus
    bus = { publish: () => {}, subscribe: () => () => {} }
  }
  return { v: 1, env, signal: init?.signal, now, bus, logger: init?.logger }
}
