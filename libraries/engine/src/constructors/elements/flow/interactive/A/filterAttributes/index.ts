import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import { LINK_WITH_HREF_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import {
	FORM_TARGETS,
	REFERRER_POLICIES,
	RELS_FOR_AREA,
} from "@engineSrc/constructors/elements/constants/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import type { AnchorElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: AnchorElementAttributes) {

	const {
		id,
		download,
		href,
		hrefLang,
		ping,
		referrerPolicy,
		rel,
		target,
		type,
		// ARIA attributes
		role,
		"aria-current": ariaCurrent,
		"aria-expanded": ariaExpanded,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-disabled": ariaDisabled,
		"aria-hidden": ariaHidden,
		"aria-haspopup": ariaHaspopup,
		"aria-pressed": ariaPressed,
		"aria-selected": ariaSelected,
		"aria-controls": ariaControls,
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

	// Add anchor-specific attributes
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
	if (isDefined(target)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_TARGETS))("target")(target),
		)
	}
	if (isDefined(type)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("type")(type))
	}

	// Add ARIA attributes
	// Note: This assumes href is present. For links without href, any role is allowed.
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(LINK_WITH_HREF_ROLES))("role")(role),
		)
	}
	if (isDefined(ariaCurrent)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-current")(ariaCurrent),
		)
	}
	if (isDefined(ariaExpanded)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-expanded")(ariaExpanded),
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
	if (isDefined(ariaDisabled)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-disabled")(ariaDisabled),
		)
	}
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}
	if (isDefined(ariaHaspopup)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-haspopup")(ariaHaspopup),
		)
	}
	if (isDefined(ariaPressed)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-pressed")(ariaPressed),
		)
	}
	if (isDefined(ariaSelected)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-selected")(ariaSelected),
		)
	}
	if (isDefined(ariaControls)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-controls")(ariaControls),
		)
	}

	return filteredAttrs

}
