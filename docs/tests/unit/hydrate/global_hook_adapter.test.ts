import { assertEquals } from "jsr:@std/assert"
import { getVizAdapter, setVizAdapter, vizNoopAdapter } from "@sitebender/components/index.ts"

Deno.test("global viz adapter hook is auto-registered and used in docs hydrate", async () => {
  // Preserve globals and registry adapter
  const g = globalThis as unknown as Record<string, unknown>
  const prevDoc = g.document
  const prevWin = g.window
  const prevGlobalAdapter = (g as any).sitebenderVizAdapter
  const prevRegistryAdapter = getVizAdapter()

  // Minimal fake document/window
  const els: Array<{ dataset: Record<string, string> }> = [
    { dataset: {} },
    { dataset: {} },
  ]

  const fakeDocument = {
    readyState: "complete",
    getElementById: (_: string) => null, // skip IR hydration path
    querySelectorAll: (_: string) => els,
    addEventListener: (_: string, __: unknown) => void 0,
  } as unknown as Document

  ;(g as any).document = fakeDocument
  ;(g as any).window = {}

  // Provide a global hook adapter
  const globalAdapter = {
    hydrate(root?: Document | HTMLElement) {
      const scope = (root ?? document) as Document
      const nodes = scope.querySelectorAll("[data-viz]") as unknown as Array<
        { dataset: Record<string, string> }
      >
      for (const n of nodes) n.dataset.vizHydrated = "global"
    },
  }
  ;(g as any).sitebenderVizAdapter = globalAdapter

  // Import hydrate entry so it executes with our fake globals
  const modUrl = new URL("../../../src/hydrate/adaptive.ts", import.meta.url)
  await import(modUrl.href)

  // The global adapter should have been auto-registered and executed
  for (const el of els) {
    assertEquals(el.dataset.vizHydrated, "global")
  }

  // Cleanup: restore globals and registry adapter
  ;(g as any).document = prevDoc
  ;(g as any).window = prevWin
  if (prevGlobalAdapter === undefined) delete (g as any).sitebenderVizAdapter
  else (g as any).sitebenderVizAdapter = prevGlobalAdapter

  if (prevRegistryAdapter) setVizAdapter(prevRegistryAdapter)
  else setVizAdapter(vizNoopAdapter as any)
})
