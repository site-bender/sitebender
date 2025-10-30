import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

export default function _validateStringAttribute(
	prop: string,
) {
	return function _validateStringAttributeWithProp(
		props: Readonly<Record<string, unknown>>,
	): Readonly<Record<string, string>> {
		if (prop in props) {
			const value = props[prop]

			if (isString(value)) {
				return { [prop]: value as string }
			}

			return { [`data-§-bad-${prop}`]: String(value) }
		}

		return {}
	}
}
