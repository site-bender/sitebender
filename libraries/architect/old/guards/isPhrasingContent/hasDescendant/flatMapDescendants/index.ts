import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function flatMapDescendants(
	children: readonly unknown[],
): readonly string[] {
	const reducer = (out: string[], child: unknown): string[] => {
		if (
			typeof child === "object" && child !== null &&
			"tag" in (child as Record<string, unknown>)
		) {
			const el = child as ElementConfig
			const tag = (el.tag ?? "") as string
			const childTags = Array.isArray(el.children)
				? flatMapDescendants(el.children as readonly unknown[])
				: []
			return [...out, tag, ...childTags]
		}
		return out
	}

	return reduce(reducer)([])([...children])
}
