import type { GlobalAttributes, Value } from "../../../types/index.ts"

import isBoolean from "../../guards/isBoolean/index.ts"
import isCharacter from "../../guards/isCharacter/index.ts"
import isCSSStyleDeclaration from "../../guards/isCSSStyleDeclaration/index.ts"
import isEmptyStringOrBoolean from "../../guards/isEmptyStringOrBoolean/index.ts"
import isMemberOf from "../../guards/isMemberOf/index.ts"
import isString from "../../guards/isString/index.ts"
import isTabIndex from "../../guards/isTabIndex/index.ts"

/**
 * Global HTML attributes with comprehensive validation
 */
const globalAttributes = {
	accessKey: isCharacter,
	autoCapitalize: isMemberOf([
		"characters",
		"none",
		"off",
		"on",
		"sentences",
		"words",
	]),
	class: isString,
	contentEditable: isEmptyStringOrBoolean,
	dir: isMemberOf(["auto", "ltr", "rtl"]),
	draggable: isBoolean,
	enterKeyHint: isMemberOf([
		"done",
		"enter",
		"go",
		"next",
		"previous",
		"search",
		"send",
	]),
	hidden: isMemberOf(["", "hidden", "until-found"]),
	id: isString,
	inert: isBoolean,
	inputMode: isMemberOf([
		"decimal",
		"email",
		"none",
		"numeric",
		"search",
		"tel",
		"text",
		"url",
	]),
	itemId: isString,
	itemRef: isString,
	itemScope: isBoolean,
	itemType: isString,
	lang: isString,
	nonce: isString,
	popover: isMemberOf(["auto", "manual"]),
	role: isString,
	spellcheck: isEmptyStringOrBoolean,
	style: isCSSStyleDeclaration,
	tabIndex: isTabIndex,
	tabindex: isTabIndex,
	title: isString,
	translate: isMemberOf(["no", "yes"]),
}

/**
 * Filters and validates global HTML attributes
 *
 * @param attributes - Input attributes object
 * @returns Validated global attributes
 */
export default function pickGlobalAttributes(attributes: unknown = {}) {
	const out = Object.fromEntries(
		Object.entries(attributes)
			.filter(([key, value]) => {
				const f = globalAttributes[key as keyof typeof globalAttributes]
				return f ? f(value) : false
			})
			.map(([key, value]) => [key.toLocaleLowerCase(), value]),
	)

	if (typeof out["style"] === "object") {
		out["style"] = Object.entries(out["style"] as Record<string, unknown>)
			.map(([key, value]) => `${key}: ${value}`)
			.join("; ")
	}

	return out
}
