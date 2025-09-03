import state from "../registry/index.ts"
import type { VizAdapter } from "../types.ts"

export default function setVizAdapter(adapter: VizAdapter) {
  state.currentAdapter = adapter
}
