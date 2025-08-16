import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { AriaAttributes } from "../../../types/aria/index.ts"
import type { AsideAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"
import { ASIDE_ROLES } from "../../../constants/aria-roles.ts"

/**
 * Extended Aside attributes including reactive properties and ARIA
 */
export type AsideElementAttributes = AsideAttributes & AriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Aside element
 * Allows global attributes and validates aside-specific attributes
 */
export const filterAttributes = (attributes: AsideElementAttributes) => {
	const {
		id,
		// ARIA attributes (using general AriaAttributes since there's no specific AsideAriaAttributes)
		role,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-atomic": ariaAtomic,
		"aria-busy": ariaBusy,
		"aria-live": ariaLive,
		"aria-relevant": ariaRelevant,
		// Reactive properties (to be excluded from HTML attributes)
		calculation: _calculation,
		dataset: _dataset,
		display: _display,
		format: _format,
		scripts: _scripts,
		stylesheets: _stylesheets,
		validation: _validation,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	// Build the filtered attributes object step by step to avoid union type complexity
	const filteredAttrs: Record<string, unknown> = {}

	// Add ID if present
	Object.assign(filteredAttrs, getId(id))

	// Add global attributes
	Object.assign(filteredAttrs, globals)

	// Add ARIA attributes
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(ASIDE_ROLES))("role")(role),
		)
	}
	if (isDefined(ariaLabel)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-label")(ariaLabel),
		)
	}
	if (isDefined(ariaLabelledby)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-labelledby")(ariaLabelledby),
		)
	}
	if (isDefined(ariaDescribedby)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-describedby")(ariaDescribedby),
		)
	}
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}
	if (isDefined(ariaAtomic)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-atomic")(ariaAtomic),
		)
	}
	if (isDefined(ariaBusy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-busy")(ariaBusy),
		)
	}
	if (isDefined(ariaLive)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-live")(ariaLive),
		)
	}
	if (isDefined(ariaRelevant)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-relevant")(ariaRelevant),
		)
	}

	return filteredAttrs
}

/**
 * Creates an Aside element configuration object
 *
 * The aside element represents content that is related to the
 * primary content but is separate from it, such as sidebars,
 * pull quotes, or advertising.
 *
 * @example
 * ```typescript
 * const aside = Aside({
 *   id: "sidebar",
 *   class: "sidebar",
 *   role: "complementary",
 *   "aria-label": "Related content"
 * })([
 *   P()("Related content..."),
 *   Nav()([...])
 * ])
 * ```
 */
export const Aside = (attributes: AsideElementAttributes = {}) =>
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
		tag: "Aside",
	}
}

export default Aside
