# Minimal state management (SSR-friendly, no dependencies)

Goals:
- Simple FRP-style store with subscribe/set/get
- Works without client JS (SSR renders current state; interactions enhance progressively)
- Optional persistence to localStorage on clients

## Store API

```ts
import { createStore, persistToLocalStorage } from "../runtime/store.ts"

type State = { count: number }
const store = createStore<State>({ count: 0 })

// Hydrate from localStorage when JS available (no-op on server)
persistToLocalStorage(store, "demo:count")

// Read current state
store.get() // -> { count: 0 }

// Subscribe reactively
const unsub = store.subscribe((s) => {
  console.log("state changed", s)
}, { emitImmediately: true })

// Update state
store.set((prev) => ({ count: prev.count + 1 }))

unsub()
```

SSR fallback:
- On the server, render markup based on store.get().
- On the client, re-create the store with the same initial state from server-rendered data (e.g., script[type="application/json"] or inlined data attributes) and hydrate event handlers.
- If JS is disabled, the page still works with server-rendered state; interactive updates won't run, but core content remains.
