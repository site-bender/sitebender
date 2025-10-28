import type { VizAdapter } from "./transform/viz/adapter/types.ts"

// Minimal public API surface: concrete wrappers only. No re-exports/barrels.

// Viz adapter utilities: provide a stable facade without re-exporting.
import getVizAdapterImpl from "./transform/viz/adapter/getVizAdapter/index.ts"
import setVizAdapterImpl from "./transform/viz/adapter/setVizAdapter/index.ts"
import vizNoopAdapterImpl from "./transform/viz/adapter/vizAdapterNoop/index.ts"

export function getVizAdapter() {
	return getVizAdapterImpl()
}

export function setVizAdapter(adapter: VizAdapter) {
	return setVizAdapterImpl(adapter)
}

export const vizNoopAdapter = vizNoopAdapterImpl

// Note: Former convenience exports for components and transforms were removed.
// Import concrete modules directly instead of using this index as a barrel.
