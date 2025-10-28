import type { VizAdapter } from "../types.ts"

import state from "../registry/index.ts"

export default function getVizAdapter(): VizAdapter | undefined {
	return state.currentAdapter
}
