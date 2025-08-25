import type { Node } from "../../../types/ir/index.ts"

export default function resolveAnchor(node: Node): HTMLElement | null {
	if (!("id" in node)) return null
	const id = (node as { id: string }).id
	const byData = globalThis.document?.querySelector(`[data-ir-id="${id}"]`) as
		| HTMLElement
		| null
	if (byData) return byData
	return globalThis.document?.getElementById(id) ?? null
}
