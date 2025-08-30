import type { ElementConfig } from "../../../../types/html/index.ts"
import type { Value } from "../../../../types/index.ts"

const collectLinkElements = (component: Record<string, unknown>): Array<Value> => {
	const linkElements = Object.entries(component).reduce(
		(links: Array<Value>, [key, value]: [string, unknown]) => {
			if (key === "dependencies") {
				links.push(...(value as Array<Value>))
			}

			if (key === "children") {
				const childLinks = (value as Array<ElementConfig> | undefined)?.reduce(
					(out: Array<Value>, item: ElementConfig) => out.concat(collectLinkElements(item as unknown as Record<string, unknown>)),
					[],
				)

				if (childLinks) {
					links.push(...childLinks)
				}
			}

			return links
		},
		[],
	)

	return linkElements
}

export default collectLinkElements
