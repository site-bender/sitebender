import type { Node } from "../../../../types/ir/index.ts"

export default function resolveAnchor(node: Node): HTMLElement | null {
	if (typeof document === "undefined") return null
	const id = (node as unknown as { id?: string }).id
	if (!id) return null
	const byData = document.querySelector(`[data-ir-id="${id}"]`)
	if (byData && (byData as Element).nodeType === 1) {
		return byData as HTMLElement
	}
	const byId = document.getElementById(id)
	return byId && (byId as Element).nodeType === 1
		? (byId as HTMLElement)
		: null
}
