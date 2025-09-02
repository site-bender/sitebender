# Viz adapter contract

A Viz adapter is a tiny object used by the docs/app hydration to render charts.

- Contract: it exposes a `hydrate(root?: Document | HTMLElement)` method.
- The default export in this folder (`noop.ts`) implements the contract and simply marks elements matching `[data-viz]` with `dataset.vizHydrated = "true"`.
- A simple in-memory registry (`registry.ts`) provides `setVizAdapter()` and `getVizAdapter()` so apps can install their own adapter at runtime.

## Usage

- Install a custom adapter at app startup:

```ts
import { setVizAdapter } from "@sitebender/components"

setVizAdapter({
  hydrate(root) {
    const scope = (root ?? document)
    for (const el of scope.querySelectorAll('[data-viz]')) {
      // render your chart into `el` here
    }
  }
})
```

- The docs hydrate step prefers the registry adapter if present, otherwise falls back to the noop adapter's `hydrateVizContainers()`.

## Testing

- See `libraries/components/tests/unit/viz_noop_adapter.test.ts` for the noop behavior.
- See `docs/tests/unit/hydrate/registry_adapter.test.ts` for end-to-end registry preference in the docs hydrate bootstrap.
