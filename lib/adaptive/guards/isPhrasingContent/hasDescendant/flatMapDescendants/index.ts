import type {
	ElementConfig,
	GlobalAttributes,
} from "../../../../constructors/elements/types/index.ts"
import type { ElementConfig } from "../../../../types/html/index.ts"

import reduce from "../../../../utilities/array/reduce/index.ts"

/**
 * Flattens child elements to get all descendant tags
 *
 * @param children - Array of child elements
 * @returns Array of descendant tag names
 */
export default function flatMapDescendants(
	children: readonly unknown[],
): readonly string[] {
	return reduce((out: readonly string[], child: ElementConfig) => {
		if (typeof child === "object" && child !== null && "tag" in child) {
			const childElement = child as ElementConfig
			return [
				...out,
				childElement.tag || "",
				...(childElement.children
					? flatMapDescendants(childElement.children)
					: []),
			]
		}
		return out
	})([])(children)
}
