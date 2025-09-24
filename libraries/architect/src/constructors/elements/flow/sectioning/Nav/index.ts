import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { NavAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { NavigationAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import TextNode from "@sitebender/architect/constructors/elements/TextNode/index.ts"
import isFlowContent from "@sitebender/architect/guards/isFlowContent/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Nav attributes including reactive properties and ARIA
 */
export type NavElementAttributes = NavigationAttributes & NavAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Nav element
 * Allows global attributes and validates nav-specific attributes
 */

/**
 * Creates a Nav element configuration object
 *
 * The nav element represents a section of navigation links.
 * It is appropriate for major navigation blocks.
 *
 * @example
 * ```typescript
 * const nav = Nav({
 *   id: "main-nav",
 *   class: "navigation",
 *   role: "navigation",
 *   "aria-label": "Main navigation"
 * })([
 *   Ul()([
 *     Li()([A({ href: "/" })("Home")]),
 *     Li()([A({ href: "/about" })("About")]),
 *     Li()([A({ href: "/contact" })("Contact")])
 *   ])
 * ])
 * ```
 */
const Nav = (attributes: NavElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const { id, ...attribs } = filterAttributes(attributes)
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
	} = attributes

	// Convert string children to TextNode and filter children
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter((child) => {
			if (typeof child === "object" && child !== null && "tag" in child) {
				return isFlowContent()(child as ElementConfig)
			}
			return true
		})
		: (typeof children === "object" && children !== null &&
				"tag" in children && isFlowContent()(children as ElementConfig))
		? [children]
		: []

	return {
		attributes: {
			id,
			...attribs,
		},
		children: kids,
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Nav",
	}
}

export default Nav
