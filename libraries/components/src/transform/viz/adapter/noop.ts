/**
 * No-op Viz renderer adapter
 *
 * Finds elements with data-viz attributes and marks them hydrated.
 * This is a placeholder for a real chart renderer.
 */

import type { VizAdapter } from "./types.ts"
import hydrateVizContainers from "./hydrateVizContainers/index.ts"

// Provide VizAdapter-compatible hydrate() method; export as default
const vizAdapterNoop: VizAdapter & {
	hydrateVizContainers: typeof hydrateVizContainers
} = {
	hydrate: (root?: Document | HTMLElement) => hydrateVizContainers(root),
	hydrateVizContainers,
}

export default vizAdapterNoop
