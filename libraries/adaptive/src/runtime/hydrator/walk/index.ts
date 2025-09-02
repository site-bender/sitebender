import type { Node } from "../../../../types/ir/index.ts"

export default function walk(node: Node, fn: (n: Node) => void) {
	fn(node)
	if ((node as { children?: Node[] }).children) {
		for (const child of (node as { children: Node[] }).children) walk(child, fn)
	}
	if ((node as { args?: Node[] }).args) {
		for (const arg of (node as { args: Node[] }).args) walk(arg, fn)
	}
}
