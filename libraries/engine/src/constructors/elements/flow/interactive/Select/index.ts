import type { SelectAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import { getSelectAllowedRoles } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import { AUTOCOMPLETES } from "@engineSrc/constructors/elements/constants/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Filters attributes for Select element
 * Allows global attributes and validates select-specific attributes
 */

/**
 * Extended Select attributes including reactive properties
 */
export type SelectElementAttributes = SelectAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}



/**
 * Creates a Select element configuration object
 *
 * The select element represents a control that provides a menu of options.
 *
 * @param attributes - Element attributes
 * @param children - Child elements (typically Option and OptGroup elements)
 * @returns Element configuration object
 *
 * @example
 * ```typescript
 * const select = Select({
 *   name: "color",
 *   required: true
 * })([
 *   Option({ value: "red" })("Red"),
 *   Option({ value: "blue" })("Blue")
 * ])
 * ```
 */
const Select =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const {
			calculation,
			dataset,
			display,
			format,
			scripts,
			stylesheets,
			validation,
			...attrs
		} = attributes
		const { id, ...attribs } = filterAttributes(attrs)

		return {
			attributes: {
				...getId(id),
				...attribs,
			},
			children,
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(format) ? { format } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
			tag: "select",
		}
	}

export default Select

export { default as filterAttributes } from "./filterAttributes/index.ts"
