import state from "../registry/index.ts"
import type { VizAdapter } from "../types.ts"

export default function getVizAdapter(): VizAdapter | undefined {
  return state.currentAdapter
}
