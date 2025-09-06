import {
	getVizAdapter,
	setVizAdapter,
	vizNoopAdapter,
} from "@sitebender/components/index.ts"
import createComposeContext from "@sitebender/engine/context/composeContext/index.ts"
import registerDefaultExecutors from "@sitebender/engine/operations/defaults/registerDefaults/index.ts"
import hydrate from "@sitebender/engine/runtime/hydrator/index.ts"

type GlobalWithViz = Record<string, unknown> & {
	sitebenderVizAdapter?: { hydrate: (root?: Document | HTMLElement) => void }
}

export default function hydrateEngineFromScriptTag() {
	const el = document.getElementById("ir-root")
	if (!el) return
	const ir = JSON.parse(el.textContent || "{}")
	const ctx = createComposeContext({ env: "client" })
	registerDefaultExecutors(ctx)
	hydrate(ir, ctx)

	// In production, strip data-ir-id attributes after hydration to reduce DOM noise
	const g = globalThis as unknown as
		& { location?: Location }
		& Record<string, unknown>
	const host = g.location?.hostname || ""
	const isLocal = host === "localhost" || host === "127.0.0.1" ||
		host.endsWith(".local")
	if (!isLocal) {
		queueMicrotask(() => {
			try {
				document.querySelectorAll("[data-ir-id]")
					.forEach((n) =>
						(n as HTMLElement).removeAttribute("data-ir-id")
					)
			} catch { /* ignore */ }
		})
	}
}

if (typeof window !== "undefined") {
	// Run after DOM is ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			try {
				hydrateEngineFromScriptTag()
			} catch (e) {
				console.error(e)
			}
			// Viz containers: prefer registry adapter if available, otherwise noop
			try {
				// Optional global hook: allow external scripts to provide an adapter
				const g = globalThis as unknown as GlobalWithViz
				const globalAdapter = g.sitebenderVizAdapter
				if (
					globalAdapter && typeof globalAdapter.hydrate === "function"
				) {
					setVizAdapter(globalAdapter)
				}
				const adapter = getVizAdapter()
				if (adapter && typeof adapter.hydrate === "function") {
					adapter.hydrate(document)
				} else vizNoopAdapter.hydrateVizContainers(document)
			} catch { /* ignore */ }
		})
	} else {
		try {
			hydrateEngineFromScriptTag()
		} catch (e) {
			console.error(e)
		}
		try {
			const g = globalThis as unknown as GlobalWithViz
			const globalAdapter = g.sitebenderVizAdapter
			if (globalAdapter && typeof globalAdapter.hydrate === "function") {
				setVizAdapter(globalAdapter)
			}
			const adapter = getVizAdapter()
			if (adapter && typeof adapter.hydrate === "function") {
				adapter.hydrate(document)
			} else vizNoopAdapter.hydrateVizContainers(document)
		} catch { /* ignore */ }
	}
}
