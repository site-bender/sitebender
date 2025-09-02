import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"

import reduce from "@toolkit/simple/array/reduce/index.ts"

/**
 * Flattens child elements to get all descendant tags
 *
 * @param children - Array of child elements
 * @returns Array of descendant tag names
 */
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
