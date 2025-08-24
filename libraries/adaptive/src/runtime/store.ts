export type Subscriber<S> = (state: Readonly<S>) => void
export type Unsubscribe = () => void

export type Store<S> = {
  get: () => Readonly<S>
  set: (updater: S | ((prev: Readonly<S>) => S)) => void
  subscribe: (fn: Subscriber<S>, options?: { emitImmediately?: boolean }) => Unsubscribe
}

export function createStore<S>(initial: S): Store<S> {
  let state = initial
  const subs = new Set<Subscriber<S>>()

  const get = () => state as Readonly<S>
  const set: Store<S>["set"] = (updater) => {
    const next = typeof updater === 'function' ? (updater as (p: Readonly<S>) => S)(state) : updater
    if (Object.is(next, state)) return
    state = next
    for (const fn of subs) fn(state)
  }
  const subscribe: Store<S>["subscribe"] = (fn, options) => {
    subs.add(fn)
    if (options?.emitImmediately) fn(state)
    return () => { subs.delete(fn) }
  }

  return { get, set, subscribe }
}

export function persistToLocalStorage<S>(store: Store<S>, key: string, serialize: (s: S) => string = JSON.stringify) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) store.set(() => JSON.parse(raw))
  } catch {
    // ignore JSON/Storage errors (quota/denied)
  }
  return store.subscribe((s) => {
    try { localStorage.setItem(key, serialize(s)) } catch {
      // ignore write errors
    }
  })
}
