import type { AriaAttributes } from "@adaptiveSrc/constructors/elements/types/aria/index.ts"
import type { InlineFrameAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import {
	REFERRER_POLICIES,
	SANDBOXES,
} from "@adaptiveSrc/constructors/elements/constants/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isInteger from "@adaptiveSrc/guards/isInteger/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import isSubsetOf from "@adaptiveSrc/guards/isSubsetOf/index.ts"
import isValidIframeAllow from "@adaptiveSrc/guards/isValidIframeAllow/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Extended IFrame attributes including reactive properties and ARIA
 */
export type IFrameElementAttributes =
	& InlineFrameAttributes
	& Pick<
		AriaAttributes,
		| "role"
		| "aria-label"
		| "aria-labelledby"
		| "aria-describedby"
		| "aria-hidden"
	>
	& {
		calculation?: Operand
		dataset?: Record<string, Value>
		display?: ComparatorConfig | LogicalConfig
		format?: OperatorConfig
		scripts?: string[]
		stylesheets?: string[]
		validation?: ComparatorConfig | LogicalConfig
	}

/**
 * Filters attributes for IFrame element
 * Allows global attributes and validates iframe-specific attributes
 */
export const filterAttributes = (attributes: IFrameElementAttributes) => {
	const {
		id,
		allow,
		allowFullScreen,
		height,
		name,
		referrerPolicy,
		sandbox,
		src,
		srcDoc,
		width,
		// ARIA attributes
		role,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
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

	// Add iframe-specific attributes
	if (isDefined(allow)) {
		// Adapt boolean guard to a type predicate
		const isValidAllow = (v: string): v is string => isValidIframeAllow(v)
		Object.assign(filteredAttrs, filterAttribute(isValidAllow)("allow")(allow))
	}
	if (isDefined(allowFullScreen)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("allowfullscreen")(allowFullScreen),
		)
	}
	if (isDefined(height)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("height")(height))
	}
	// Note: loading attribute not currently modeled in InlineFrameAttributes
	if (isDefined(name)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	}
	if (isDefined(referrerPolicy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerpolicy")(
				referrerPolicy,
			),
		)
	}
	if (isDefined(sandbox)) {
		// Wrap boolean guard into a type predicate string guard
		const isSandbox = (v: Value): v is string =>
			typeof v === "string" && isSubsetOf(SANDBOXES)(v)
		Object.assign(filteredAttrs, filterAttribute(isSandbox)("sandbox")(sandbox))
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
	}
	if (isDefined(srcDoc)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("srcdoc")(srcDoc))
	}
	if (isDefined(width)) {
		Object.assign(filteredAttrs, filterAttribute(isInteger)("width")(width))
	}

	// Add ARIA attributes
	if (isDefined(role)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("role")(role))
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

	return filteredAttrs
}

/**
 * Creates an IFrame element configuration object
 *
 * The iframe element represents a nested browsing context, embedding another HTML page.
 * This is a void element (cannot have children).
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
export const IFrame = (
	attributes: IFrameElementAttributes = {},
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

	return {
		attributes: {
			id,
			...attribs,
		},
		children: [], // Void element
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset)
			? { dataset: dataset as Record<string, Value> }
			: {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "IFrame",
	}
}

export default IFrame
