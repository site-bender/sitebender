import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isBoolean from "@sitebender/toolsmith/predicates/isBoolean/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

export default function _validateTrueFalseOrBoolean(prop: string) {
	return function _validateTrueFalseOrBooleanWithProp(
		props: Readonly<Record<string, unknown>>,
	): Readonly<Record<string, string>> {
		if (isDefined(props[prop])) {
			const value = props[prop]

			if (or(isBoolean(value))(isString(value))) {
				const normalized = isBoolean(value)
					? String(value)
					: (value as string).toLowerCase()

				if (includes(["true", "false"])(normalized)) {
					return { [prop]: normalized }
				}
			}

			return { [`data-§-bad-${prop}`]: String(value) }
		}

		return {}
	}
}
