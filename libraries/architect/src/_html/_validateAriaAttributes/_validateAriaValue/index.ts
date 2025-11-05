import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

import { ARIA_ATTRIBUTES } from "../../constants/ariaStandards.ts"

import type { AriaAttributeDefinition } from "../../constants/ariaStandards.ts"

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
		if (!isDefined(attrDefinition)) {
			return undefined
		}

		/*++
		 + Check if value is defined
		 + Some attributes allow empty values
		 */
		if (!isDefined(value)) {
			if (attrDefinition.allowEmpty === true) {
				return undefined
			}

			return `Attribute '${attributeName}' requires a value`
		}

		/*++
		 + All ARIA attribute values must be strings
		 + (Even numbers are represented as strings in HTML)
		 */
		if (!isString(value)) {
			return `Attribute '${attributeName}' value must be a string, got ${typeof value}`
		}

		/*++
		 + Check for empty strings
		 */
		if (value.length === 0) {
			if (attrDefinition.allowEmpty === true) {
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
		if (type === "boolean") {
			return _validateBoolean(attributeName)(value)
		}

		/*++
		 + Nmtoken: validate against enumerated values if present
		 */
		if (type === "nmtoken") {
			return _validateNmtoken(attributeName)(attrDefinition)(value)
		}

		/*++
		 + Integer: validate as integer, check minValue if present
		 */
		if (type === "int") {
			return _validateInteger(attributeName)(attrDefinition)(value)
		}

		/*++
		 + Decimal: validate as number
		 */
		if (type === "decimal") {
			return _validateDecimal(attributeName)(value)
		}

		/*++
		 + Idref: validate as element ID reference
		 */
		if (type === "idref") {
			return _validateIdref(attributeName)(value)
		}

		/*++
		 + Idrefs: validate as space-separated element ID references
		 */
		if (type === "idrefs") {
			return _validateIdrefs(attributeName)(value)
		}

		/*++
		 + String: accept any string value
		 */
		if (type === "string") {
			return undefined
		}

		/*++
		 + Unknown type → should not happen
		 */
		return `Unknown type '${type}' for attribute '${attributeName}'`
	}
}

/*++
 + Validates boolean value: only "true" or "false"
 */
function _validateBoolean(attributeName: string) {
	return function _validateBooleanValue(value: string): string | undefined {
		if (value === "true" || value === "false") {
			return undefined
		}

		return `Attribute '${attributeName}' must be "true" or "false", got "${value}"`
	}
}

/*++
 + Validates nmtoken value against enumerated values if present
 */
function _validateNmtoken(attributeName: string) {
	return function _validateNmtokenForAttribute(
		attrDefinition: AriaAttributeDefinition,
	) {
		return function _validateNmtokenValue(value: string): string | undefined {
			/*++
			 + If no enumerated values, accept any token
			 */
			if (!isDefined(attrDefinition.values)) {
				return undefined
			}

			const { values } = attrDefinition

			if (includes(values)(value)) {
				return undefined
			}

			const valuesList = values.join('", "')

			return `Attribute '${attributeName}' must be one of: "${valuesList}", got "${value}"`
		}
	}
}

/*++
 + Validates integer value
 */
function _validateInteger(attributeName: string) {
	return function _validateIntegerForAttribute(
		attrDefinition: AriaAttributeDefinition,
	) {
		return function _validateIntegerValue(value: string): string | undefined {
			/*++
			 + Check if value is a valid integer
			 */
			const intValue = parseInt(value, 10)

			if (isNaN(intValue) || intValue.toString() !== value) {
				return `Attribute '${attributeName}' must be an integer, got "${value}"`
			}

			/*++
			 + Check minValue constraint if present
			 */
			if (isDefined(attrDefinition.minValue)) {
				if (intValue < attrDefinition.minValue) {
					return `Attribute '${attributeName}' must be >= ${attrDefinition.minValue}, got ${intValue}`
				}
			}

			return undefined
		}
	}
}

/*++
 + Validates decimal value
 */
function _validateDecimal(attributeName: string) {
	return function _validateDecimalValue(value: string): string | undefined {
		/*++
		 + Check if value is a valid number
		 */
		const numValue = parseFloat(value)

		if (isNaN(numValue)) {
			return `Attribute '${attributeName}' must be a number, got "${value}"`
		}

		return undefined
	}
}

/*++
 + Validates idref value (element ID reference)
 */
function _validateIdref(attributeName: string) {
	return function _validateIdrefValue(value: string): string | undefined {
		/*++
		 + ID references must be non-empty strings
		 + They cannot contain spaces
		 */
		if (value.length === 0) {
			return `Attribute '${attributeName}' cannot be empty`
		}

		if (value.includes(" ")) {
			return `Attribute '${attributeName}' cannot contain spaces (use 'idrefs' for multiple IDs)`
		}

		return undefined
	}
}

/*++
 + Validates idrefs value (space-separated element ID references)
 */
function _validateIdrefs(attributeName: string) {
	return function _validateIdrefsValue(value: string): string | undefined {
		/*++
		 + ID references list must be non-empty
		 */
		if (value.length === 0) {
			return `Attribute '${attributeName}' cannot be empty`
		}

		/*++
		 + Split by whitespace and validate each ID
		 */
		const ids = value.trim().split(/\s+/)

		const validateIdref = _validateIdref(attributeName)

		/*++
		 + Validate each ID individually
		 + Check each ID and return first error found
		 */
		function validateEachId(
			currentIds: ReadonlyArray<string>,
		): string | undefined {
			if (currentIds.length === 0) {
				return undefined
			}

			const firstId = currentIds[0]
			const error = validateIdref(firstId)

			if (isDefined(error)) {
				return error
			}

			const remainingIds = currentIds.slice(1)

			return validateEachId(remainingIds)
		}

		return validateEachId(ids)
	}
}
