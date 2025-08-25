import type { Node } from "../../../../types/ir/index.ts"

export default function resolveAnchor(node: Node): HTMLElement | null {
  // pre-existing simple MVP: id-based lookup
  const target = (node as unknown as { meta?: { anchor?: string } }).meta?.anchor
  if (!target || typeof document === 'undefined') return null
  const el = document.querySelector(`[data-ir-id="${target}"]`)
  return el instanceof HTMLElement ? el : null
}
