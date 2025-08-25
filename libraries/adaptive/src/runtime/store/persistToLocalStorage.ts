import type { Store } from "./createStore.ts"

export default function persistToLocalStorage<S>(store: Store<S>, key: string, serialize: (s: S) => string = JSON.stringify) {
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
