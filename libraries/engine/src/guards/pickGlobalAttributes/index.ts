import type { Value } from "@sitebender/engine-types/index.ts"
import type { GlobalAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

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
	// canonical keys per GlobalAttributes
	accessKey: isCharacter,
	autocapitalize: isMemberOf([
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
	spellCheck: isEmptyStringOrBoolean,
	style: isCSSStyleDeclaration,
	tabIndex: isTabIndex,
	title: isString,
	translate: isMemberOf(["no", "yes"]),
	// Accept common synonyms (input keys) and normalize them below
	tabindex: isTabIndex,
	spellcheck: isEmptyStringOrBoolean,
} as const

type GlobalAttributeKey = keyof typeof globalAttributes

const toCanonicalKey = (key: string): keyof GlobalAttributes | undefined => {
	switch (key) {
		case "tabindex":
			return "tabIndex"
		case "spellcheck":
			return "spellCheck"
		default:
			return (key in globalAttributes ? key : undefined) as
				| keyof GlobalAttributes
				| undefined
	}
}

/**
 * Filters and validates global HTML attributes
 *
 * @param attributes - Input attributes object
 * @returns Validated global attributes
 */
export default function pickGlobalAttributes(
	attributes: Record<string, unknown> = {},
): GlobalAttributes {
	const result: Partial<GlobalAttributes> = {}

	for (const [rawKey, value] of Object.entries(attributes)) {
		const guard = (globalAttributes as Record<string, (v: Value) => boolean>)[
			rawKey
		] ??
			(globalAttributes as Record<string, (v: Value) => boolean>)[
				rawKey.toLowerCase()
			]
		const canonical = toCanonicalKey(rawKey) ??
			(rawKey as keyof GlobalAttributes)

		if (guard && guard(value as Value)) {
			if (
				canonical === "style" && typeof value === "object" &&
				value !== null
			) {
				;(result as Record<string, unknown>)["style"] = Object.entries(
					value as Record<string, unknown>,
				)
					.map(([k, v]) => `${k}: ${String(v)}`)
					.join("; ")
			} else {
				;(result as Record<string, unknown>)[canonical as string] =
					value as unknown
			}
		}
	}

	return result as GlobalAttributes
}
