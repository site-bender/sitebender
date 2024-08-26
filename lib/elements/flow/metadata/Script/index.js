import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import {
	BLOCKINGS,
	CROSS_ORIGINS,
	FETCH_PRIORITIES,
	REFERRER_POLICIES,
} from "../../../../rendering/constants"
import generateShortId from "../../../../utilities/generateShortId"

export const filterAttributes = attributes => {
	const {
		async,
		blocking,
		crossOrigin,
		defer,
		fetchPriority,
		integrity,
		noModule,
		referrerPolicy,
		src,
		type,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("async")(async),
		...filterAttribute(isMemberOf(BLOCKINGS))("blocking")(blocking),
		...filterAttribute(isMemberOf(CROSS_ORIGINS))("crossOrigin")(crossOrigin),
		...filterAttribute(isBoolean)("defer")(defer),
		...filterAttribute(isMemberOf(FETCH_PRIORITIES))("fetchPriority")(
			fetchPriority,
		),
		...filterAttribute(isString)("integrity")(integrity),
		...filterAttribute(isBoolean)("noModule")(noModule),
		...filterAttribute(isMemberOf(REFERRER_POLICIES))("referrerPolicy")(
			referrerPolicy,
		),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("type")(type),
	}
}

const Script =
	(attributes = {}) =>
	(children = []) => {
		const { dataset, ...attrs } = attributes
		const {
			id = generateShortId(),
			type = "module",
			...attribs
		} = filterAttributes(attrs)

		return {
			attributes: {
				id,
				type,
				...attribs,
			},
			children,
			dataset,
			tag: "Script",
		}
	}

export default Script
