import hydrate from "../../../libraries/adaptive/src/runtime/hydrator/index.ts"
import { createComposeContext } from "../../../libraries/adaptive/src/context/composeContext/index.ts"
import { registerDefaultExecutors } from "../../../libraries/adaptive/src/operations/defaults/registerDefaults/index.ts"

export function hydrateAdaptiveFromScriptTag() {
  const el = document.getElementById('ir-root')
  if (!el) return
  const ir = JSON.parse(el.textContent || '{}')
  const ctx = createComposeContext({ env: 'client' })
  registerDefaultExecutors(ctx)
  hydrate(ir, ctx)
}

if (typeof window !== 'undefined') {
  queueMicrotask(() => {
    try { hydrateAdaptiveFromScriptTag() } catch (e) { console.error(e) }
  })
}
