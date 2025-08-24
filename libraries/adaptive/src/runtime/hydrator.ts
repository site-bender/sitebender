// Minimal hydrator skeleton: reads IR script, walks nodes, resolves anchors

import type { IrDocument, Node } from "../types/json/ir/index.ts"

export function parseIrFromDom(scriptId = "ir-root"): IrDocument | null {
  const el = globalThis.document?.getElementById(scriptId)
  if (!el) return null
  try {
    return JSON.parse(el.textContent || "") as IrDocument
  } catch {
    return null
  }
}

export function walk(node: Node, fn: (n: Node) => void) {
  fn(node)
  if ((node as { children?: Node[] }).children) {
    for (const child of (node as { children: Node[] }).children) walk(child, fn)
  }
  if ((node as { args?: Node[] }).args) {
    for (const arg of (node as { args: Node[] }).args) walk(arg, fn)
  }
}

export function resolveAnchor(node: Node): HTMLElement | null {
  if (!('id' in node)) return null
  const id = (node as { id: string }).id
  // Prefer elements marked with data-ir-id
  const byData = globalThis.document?.querySelector(`[data-ir-id="${id}"]`) as HTMLElement | null
  if (byData) return byData
  // Fallback to DOM id if present
  return globalThis.document?.getElementById(id) ?? null
}

export function hydrate(ir: IrDocument) {
  // Placeholder: in MVP we will compose registries and bind events here
  walk(ir, (n) => {
    void resolveAnchor(n)
  })
}
