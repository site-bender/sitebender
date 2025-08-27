import { createComposeContext } from "../../../libraries/adaptive/src/context/composeContext/index.ts"
import { registerDefaultExecutors } from "../../../libraries/adaptive/src/operations/defaults/registerDefaults/index.ts"
import hydrate from "../../../libraries/adaptive/src/runtime/hydrator/index.ts"

export function hydrateAdaptiveFromScriptTag() {
  const el = document.getElementById('ir-root')
  if (!el) return
  const ir = JSON.parse(el.textContent || '{}')
  const ctx = createComposeContext({ env: 'client' })
  registerDefaultExecutors(ctx)
  hydrate(ir, ctx)

  // In production, strip data-ir-id attributes after hydration to reduce DOM noise
  const g = globalThis as unknown as { location?: Location } & Record<string, unknown>
  const host = g.location?.hostname || ""
  const isLocal = host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")
  if (!isLocal) {
    queueMicrotask(() => {
      try {
        document.querySelectorAll('[data-ir-id]')
          .forEach((n) => (n as HTMLElement).removeAttribute('data-ir-id'))
      } catch { /* ignore */ }
    })
  }
}

if (typeof window !== 'undefined') {
  queueMicrotask(() => {
    try { hydrateAdaptiveFromScriptTag() } catch (e) { console.error(e) }
  })
}
