import type { ElementConfig } from "../../../types/html/index.ts"
import type { Value } from "../../../types/index.ts"

const collectLinkElements = (component: Record<string, any>): Array<Value> => {
	const linkElements = Object.entries(component).reduce(
		(links: Array<Value>, [key, value]: [string, any]) => {
			if (key === "dependencies") {
				links.push(...value)
			}

			if (key === "children") {
				const childLinks = value?.reduce(
					(out: Array<Value>, item: ElementConfig) => {
						return out.concat(collectLinkElements(item))
					},
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
