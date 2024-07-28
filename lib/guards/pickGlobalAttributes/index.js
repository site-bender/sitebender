import isBoolean from "../isBoolean"
import isCharacter from "../isCharacter"
import isCSSStyleDeclaration from "../isCSSStyleDeclaration"
import isEmptyStringOrBoolean from "../isEmptyStringOrBoolean"
import isMemberOf from "../isMemberOf"
import isString from "../isString"
import isTabIndex from "../isTabIndex"

const globalAttributes = {
	accesskey: isCharacter,
	autocapitalize: isMemberOf([
		"characters",
		"none",
		"off",
		"on",
		"sentences",
		"words",
	]),
	class: isString,
	contenteditable: isEmptyStringOrBoolean,
	dir: isMemberOf(["auto", "ltr", "rtl"]),
	draggable: isBoolean,
	enterkeyhint: isMemberOf([
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
	inputmode: isMemberOf([
		"decimal",
		"email",
		"none",
		"numeric",
		"search",
		"tel",
		"text",
		"url",
	]),
	itemid: isString,
	itemref: isString,
	itemscope: isBoolean,
	itemtype: isString,
	lang: isString,
	nonce: isString,
	popover: isMemberOf(["auto", "manual"]),
	spellcheck: isEmptyStringOrBoolean,
	style: isCSSStyleDeclaration,
	tabIndex: isTabIndex,
	title: isString,
	translate: isMemberOf(["no", "yes"]),
}

const pickGlobalAttributes = (attributes = {}) => {
	const out = Object.fromEntries(
		Object.entries(attributes).filter(([key, value]) => {
			const f = globalAttributes[key]

			return f ? f(value) : false
		}),
	)

	if (typeof out.style === "object") {
		out.style = Object.entries(out.style)
			.map(([key, value]) => `${key}: ${value}`)
			.join("; ")
	}

	return out
}

export default pickGlobalAttributes
