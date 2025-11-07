import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

import { ARIA_ATTRIBUTES } from "../../constants/ariaStandards/index.ts"

import type { AriaAttributeDefinition } from "../../constants/ariaStandards/index.ts"

import _validateBoolean from "./_validateBoolean/index.ts"
import _validateDecimal from "./_validateDecimal/index.ts"
import _validateIdref from "./_validateIdref/index.ts"
import _validateIdrefs from "./_validateIdrefs/index.ts"
import _validateInteger from "./_validateInteger/index.ts"
import _validateNmtoken from "./_validateNmtoken/index.ts"

/*++
 + Validates an ARIA attribute value against its type definition
 +
 + Logic:
 + 1. If attribute not in ARIA_ATTRIBUTES → return undefined (unknown attribute)
 + 2. If value not defined → check if allowEmpty permits it
 + 3. Validate value based on type:
 +    - boolean: only "true" or "false"
 +    - tristate: "true", "false", "mixed", or "undefined"
 +    - nmtoken: validate against enumerated values if present
 +    - int: validate as integer, check minValue if present
 +    - decimal: validate as number
 +    - idref/idrefs: validate as element ID reference(s)
 +    - string: accept any string value
 + 4. Return undefined if valid, error message if invalid
 +
 + Returns: undefined (valid) or error message string (invalid)
 */
export default function _validateAriaValue(attributeName: string) {
	return function _validateAriaValueForAttribute(
		value: unknown,
	): string | undefined {
		const attrDefinition: AriaAttributeDefinition | undefined =
			ARIA_ATTRIBUTES[attributeName]

		/*++
		 + Unknown attribute → return undefined (no validation data)
		 + Caller will handle as invalid attribute
		 */
		if (not(isDefined(attrDefinition))) {
			return undefined
		}

		/*++
		 + Check if value is defined
		 + Some attributes allow empty values
		 */
		if (not(isDefined(value))) {
			if (isEqual(attrDefinition.allowEmpty)(true)) {
				return undefined
			}

			return `Attribute '${attributeName}' requires a value`
		}

		/*++
		 + All ARIA attribute values must be strings
		 + (Even numbers are represented as strings in HTML)
		 */
		if (not(isString(value))) {
			return `Attribute '${attributeName}' value must be a string, got ${typeof value}`
		}

		/*++
		 + Check for empty strings
		 + [EXCEPTION] Using native .length for string length check
		 */
		if (isEqual(value.length)(0)) {
			if (isEqual(attrDefinition.allowEmpty)(true)) {
				return undefined
			}

			return `Attribute '${attributeName}' cannot be empty`
		}

		/*++
		 + Validate based on type
		 */
		const { type } = attrDefinition

		/*++
		 + Boolean: only "true" or "false"
		 */
		if (isEqual(type)("boolean")) {
			return _validateBoolean(attributeName)(value)
		}

		/*++
		 + Nmtoken: validate against enumerated values if present
		 */
		if (isEqual(type)("nmtoken")) {
			return _validateNmtoken(attributeName)(attrDefinition)(value)
		}

		/*++
		 + Integer: validate as integer, check minValue if present
		 */
		if (isEqual(type)("int")) {
			return _validateInteger(attributeName)(attrDefinition)(value)
		}

		/*++
		 + Decimal: validate as number
		 */
		if (isEqual(type)("decimal")) {
			return _validateDecimal(attributeName)(value)
		}

		/*++
		 + Idref: validate as element ID reference
		 */
		if (isEqual(type)("idref")) {
			return _validateIdref(attributeName)(value)
		}

		/*++
		 + Idrefs: validate as space-separated element ID references
		 */
		if (isEqual(type)("idrefs")) {
			return _validateIdrefs(attributeName)(value)
		}

		/*++
		 + String: accept any string value
		 */
		if (isEqual(type)("string")) {
			return undefined
		}

		/*++
		 + Unknown type → should not happen
		 */
		return `Unknown type '${type}' for attribute '${attributeName}'`
	}
}
