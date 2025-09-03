import type { NoAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { AreaAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { AreaElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: AreaElementAttributes) {

	const {
		id,
		alt,
		coords,
		download,
		href,
		hrefLang,
		ping,
		referrerPolicy,
		rel,
		shape,
		target,
		// ARIA attributes
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

	// Add area-specific attributes
	if (isDefined(alt)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("alt")(alt))
	}
	if (isDefined(coords)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("coords")(coords))
	}
	if (isDefined(download)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("download")(download),
		)
	}
	if (isDefined(href)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("href")(href))
	}
	if (isDefined(hrefLang)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("hrefLang")(hrefLang),
		)
	}
	if (isDefined(ping)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("ping")(ping))
	}
	if (isDefined(referrerPolicy)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
				referrerPolicy,
			),
		)
	}
	if (isDefined(rel)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(RELS_FOR_AREA))("rel")(rel),
		)
	}
	if (isDefined(shape)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(SHAPES))("shape")(shape),
		)
	}
	if (isDefined(target)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(TARGETS))("target")(target),
		)
	}

	// Add ARIA attributes (only aria-hidden for void elements)
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs

}
