import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isBoolean from "@sitebender/toolsmith/predicates/isBoolean/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

export default function _validateYesNoOrBoolean(prop: string) {
	return function _validateYesNoOrBooleanWithProp(
		props: Readonly<Record<string, unknown>>,
	): Readonly<Record<string, string>> {
		if (prop in props) {
			const value = props[prop]

			if (or(isBoolean(value))(isString(value))) {
				const normalized = isBoolean(value)
					? value ? "yes" : "no"
					: (value as string).toLowerCase()

				if (includes(["yes", "no"])(normalized)) {
					return { [prop]: normalized }
				}
			}

			return { [`data-§-bad-${prop}`]: String(value) }
		}

		return {}
	}
}
