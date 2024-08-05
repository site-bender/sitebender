import isDefined from "../../utilities/isDefined"

const Fragment =
	(attributes = {}) =>
	(children = []) => {
		const { scripts, stylesheets } = attributes
		const kids = Array.isArray(children) ? children : [children]

		return {
			children: kids,
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			tag: "Fragment",
		}
	}

export default Fragment
