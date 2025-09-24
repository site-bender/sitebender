import type { VizAdapter } from "../types.ts"

import state from "../registry/index.ts"

export default function setVizAdapter(adapter: VizAdapter) {
	state.currentAdapter = adapter
}
