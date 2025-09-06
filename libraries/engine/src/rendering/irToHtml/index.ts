import type { ElementNode, IrDocument, Node } from "../../../types/ir/index.ts"
import type { ComposeContext } from "../../context/composeContext/index.ts"

import createComposeContext from "../../context/composeContext/index.ts"
import registerDefaultExecutors from "../../operations/defaults/registerDefaults/index.ts"
import evaluate from "../../runtime/evaluate/index.ts"

const escapeHtml = (s: unknown): string =>
	String(s)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")

const renderAttrs = (attrs: Record<string, string | number | boolean>) =>
	Object.entries(attrs)
		.map(([k, v]) => ` ${k}="${escapeHtml(v)}"`)
		.join("")

async function renderNode(node: Node, ctx: ComposeContext): Promise<string> {
	switch (node.kind) {
		case "element": {
			const el = node as ElementNode
			const open = `<${el.tag}${renderAttrs(el.attrs)}>`
			const childrenHtml = await Promise.all(
				el.children.map((child) => renderNode(child as Node, ctx)),
			)
			return `${open}${childrenHtml.join("")}</${el.tag}>`
		}
		case "on":
			// Event bindings are ignored in SSR output
			return ""
		case "validator":
			// Validators do not affect SSR HTML directly in MVP
			return ""
		default: {
			// For injectors/operators/comparators/conditionals/actions: evaluate and stringify
			try {
				const val = await evaluate(node, ctx)
				        if (val === null || val === undefined) return ""
				return escapeHtml(val)
			} catch {
				return ""
			}
		}
	}
}

export default async function renderIrToHtml(
	ir: IrDocument,
	ctx?: ComposeContext,
): Promise<string> {
	const context = ctx ?? createComposeContext({ env: "server" })
	// Ensure defaults are present when ctx not provided
	if (!ctx) registerDefaultExecutors(context)
	return await renderNode(ir as unknown as Node, context)
}
