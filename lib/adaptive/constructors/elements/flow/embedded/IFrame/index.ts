import FilteredEmpty from "../../../../../constructors/abstracted/FilteredEmpty/index.ts"
import {
	LOADINGS,
	REFERRER_POLICIES,
	SANDBOXES,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import isSubsetOf from "../../../../../guards/isSubsetOf/index.ts"
import isValidIframeAllow from "../../../../../guards/isValidIframeAllow/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for IFrame element
 * Allows global attributes and validates iframe-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		allow,
		allowfullscreen,
		height,
		loading,
		name,
		referrerpolicy,
		sandbox,
		src,
		srcdoc,
		width,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isValidIframeAllow)("allow")(allow),
		...filterAttribute(isBoolean)("allowfullscreen")(allowfullscreen),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isMemberOf(LOADINGS))("loading")(loading),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerpolicy")(
			referrerpolicy,
		),
		...filterAttribute(isSubsetOf(SANDBOXES))("sandbox")(sandbox),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("srcdoc")(srcdoc),
		...filterAttribute(isInteger)("width")(width),
	}
}

/**
 * Creates an IFrame element configuration object
 *
 * The iframe element represents a nested browsing context, embedding another HTML page.
 *
 * @example
 * ```typescript
 * const iframe = IFrame({
 *   src: "https://example.com",
 *   width: 800,
 *   height: 600,
 *   sandbox: "allow-scripts",
 *   loading: "lazy"
 * })
 * ```
 */
export const IFrame = FilteredEmpty("IFrame")(filterAttributes)

export default IFrame
