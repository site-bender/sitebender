/*++
 + Validates decimal value
 */
export default function _validateDecimal(attributeName: string) {
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
