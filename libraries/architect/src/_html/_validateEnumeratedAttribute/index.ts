import and from "@sitebender/toolsmith/logic/and/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

import { ENUMERATED_ATTRIBUTE_VALUES } from "../constants/index.ts"

export default function _validateEnumeratedAttribute(prop: string) {
	return function _validateEnumeratedAttributeWithProp(
		props: Readonly<Record<string, unknown>>,
	): Readonly<Record<string, string>> {
		if (prop in props) {
			const value = props[prop]
			const enumeratedValues = ENUMERATED_ATTRIBUTE_VALUES[
				prop as keyof typeof ENUMERATED_ATTRIBUTE_VALUES
			]

			if (
				enumeratedValues &&
				and(isString(value))(includes(enumeratedValues)(value))
			) {
				return { [prop]: value as string }
			}
		}

		return {}
	}
}
