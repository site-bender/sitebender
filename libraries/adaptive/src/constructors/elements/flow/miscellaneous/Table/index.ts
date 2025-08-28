import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"
import type { TableAriaAttributes } from "@adaptiveSrc/constructors/elements/types/aria/index.ts"
import type { TableAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"

import isDefined from "@toolkit/simple/validation/isDefined/index.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isNumber from "@adaptiveSrc/guards/isNumber/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import { TABLE_ROLES } from "@adaptiveSrc/constructors/elements/constants/aria-roles.ts"

/**
 * Extended Table attributes including reactive properties and ARIA
 */
export type TableElementAttributes = TableAttributes & TableAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Table element
 * Allows global attributes and validates table-specific attributes
 */
export const filterAttributes = (attributes: TableElementAttributes) => {
	const {
		id,
		// ARIA attributes
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-colcount": ariaColcount,
		"aria-rowcount": ariaRowcount,
		role,
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
	if (isDefined(ariaColcount)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-colcount")(ariaColcount),
		)
	}
	if (isDefined(ariaRowcount)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-rowcount")(ariaRowcount),
		)
	}
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(TABLE_ROLES))("role")(role),
		)
	}

	return filteredAttrs
}

/**
 * Creates a Table element configuration object
 *
 * The table element represents tabular data in rows and columns.
 * It can contain caption, colgroup, thead, tbody, tfoot, tr, script, and template elements.
 *
 * @example
 * ```typescript
 * const table = Table({
 *   id: "data-table",
 *   class: "table"
 * })([
 *   Caption()("Sales Data"),
 *   THead()([
 *     Tr()([
 *       Th()("Month"),
 *       Th()("Sales")
 *     ])
 *   ]),
 *   TBody()([
 *     Tr()([
 *       Td()("January"),
 *       Td()("$1000")
 *     ])
 *   ])
 * ])
 * ```
 */
export const Table = (attributes: TableElementAttributes = {}) =>
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

	// Filter children to only allow table-specific elements
	const kids = isString(children)
		? [TextNode(children)] // Convert string to TextNode
		: Array.isArray(children)
		? children.filter((child) => {
			if (!child || typeof child !== "object" || !("tag" in child)) {
				return false // Reject text nodes in tables
			}
			return [
				"Caption",
				"ColGroup",
				"THead",
				"TBody",
				"TFoot",
				"Tr",
				"Script",
				"Template",
			].includes(child.tag)
		})
		: (children && typeof children === "object" && "tag" in children &&
				[
					"Caption",
					"ColGroup",
					"THead",
					"TBody",
					"TFoot",
					"Tr",
					"Script",
					"Template",
				].includes(children.tag))
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
		tag: "Table",
	}
}

export default Table
