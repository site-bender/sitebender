import type { VizAdapter } from "../types.ts"
import hydrateVizContainers from "../hydrateVizContainers/index.ts"

const vizAdapterNoop: VizAdapter & {
  hydrateVizContainers: typeof hydrateVizContainers
} = {
  hydrate: (root?: Document | HTMLElement) => hydrateVizContainers(root),
  hydrateVizContainers,
}

export default vizAdapterNoop
