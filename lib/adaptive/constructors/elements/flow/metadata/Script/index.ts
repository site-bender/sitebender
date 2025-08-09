import isDefined from "../../../../../../utilities/isDefined/index.ts"
import {
	BLOCKINGS,
	CROSS_ORIGINS,
	FETCH_PRIORITIES,
	REFERRER_POLICIES,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Script element
 * Allows global attributes and validates script-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		async,
		blocking,
		crossorigin,
		defer,
		fetchpriority,
		integrity,
		nomodule,
		referrerpolicy,
		src,
		type,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isBoolean)("async")(async),
		...filterAttribute(isMemberOf(BLOCKINGS))("blocking")(blocking),
		...filterAttribute(isMemberOf(CROSS_ORIGINS))("crossorigin")(crossorigin),
		...filterAttribute(isBoolean)("defer")(defer),
		...filterAttribute(isMemberOf(FETCH_PRIORITIES))("fetchpriority")(
			fetchpriority,
		),
		...filterAttribute(isString)("integrity")(integrity),
		...filterAttribute(isBoolean)("nomodule")(nomodule),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerpolicy")(
			referrerpolicy,
		),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("type")(type),
	}
}

/**
 * Creates a Script element configuration object
 *
 * The script element allows authors to include dynamic script and data blocks
 * in their documents.
 *
 * @example
 * ```typescript
 * const script = Script({
 *   src: "script.js",
 *   type: "module"
 * })([])
 * ```
 */
export const Script =
	(attributes: Record<string, unknown> = {}) => (children: unknown[] = []) => {
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
		const { type = "module", ...attribs } = filterAttributes(attrs)

		return {
			attributes: {
				type,
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
			tag: "Script",
		}
	}

export default Script
