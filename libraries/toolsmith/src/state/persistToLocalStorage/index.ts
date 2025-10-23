import type { Store, Unsubscribe } from "../types/index.ts"

import isNotNull from "../../predicates/isNotNull/index.ts"

//++ Persists store state to localStorage (browser-only, no-op on server)
export default function persistToLocalStorage<S>(
	store: Store<S>,
	key: string,
	serialize: (s: S) => string = JSON.stringify,
): Unsubscribe | undefined {
	if (typeof window === "undefined" || typeof localStorage === "undefined") {
		return
	}
	try {
		const raw = localStorage.getItem(key)
		if (isNotNull(raw)) store.set(() => JSON.parse(raw))
	} catch {
		// deno-coverage-ignore [Testing localStorage in real environment]
	}
	return store.subscribe((s) => {
		try {
			localStorage.setItem(key, serialize(s))
		} catch {
			// deno-coverage-ignore [Testing localStorage quota/errors in real environment]
		}
	})
}
