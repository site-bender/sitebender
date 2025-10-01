import type { ElementNode, Node } from "../../../../types/ir/index.ts"
import type { ComposeContext } from "../../../context/composeContext/index.ts"

import createComposeContext from "../../../context/composeContext/index.ts"
import registerDefaultExecutors from "../../../operations/defaults/registerDefaults/index.ts"
import evaluate from "../../evaluate/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default async function renderHtml(
	node: ElementNode,
	ctx?: ComposeContext,
): Promise<string> {
	const context = ctx ?? createComposeContext({ env: "server" })
	// Ensure default registries available when ctx not provided
	if (!ctx) registerDefaultExecutors(context)

	const escapeAttr = (v: unknown) => String(v)

	const renderNode = async (n: Node): Promise<string> => {
		if (n.kind === "element") {
			const el = n as ElementNode
			const attrs = Object.entries(el.attrs || {})
				.map(([k, v]) => ` ${k}="${escapeAttr(v)}"`)
				.join("")
			const childPromises = (el.children || []).map((c) =>
				renderNode(c as Node)
			)
			const childrenHtmlParts = await Promise.all(childPromises)
			return `<${el.tag}${attrs}>${childrenHtmlParts.join("")}</${el.tag}>`
		}
		// Non-element nodes: evaluate to a value and stringify
		try {
			const val = await evaluate(n, context)
			if (val === null || val === undefined) return ""
			if (typeof val === "object") return "" // avoid serializing objects here
			return String(val)
		} catch {
			return ""
		}
	}

	return await renderNode(node)
}
