import type { VizAdapter } from "./types.ts"

let currentAdapter: VizAdapter | undefined

export function setVizAdapter(adapter: VizAdapter) {
	currentAdapter = adapter
}

export function getVizAdapter(): VizAdapter | undefined {
	return currentAdapter
}
