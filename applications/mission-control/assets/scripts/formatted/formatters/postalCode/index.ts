/**
 * @name getPostalCodes
 * @description Fetches postal codes from a JSON file.
 * @returns {Promise<object>} A promise that resolves to an object containing postal codes.
 */
const getPostalCodes = async () => {
	const response = await fetch("../../../../../json/postalCodes/index.json")
	return await response.json()
}

const POSTAL_CODES = await getPostalCodes()

/**
 * @name postalCode
 * @description Formats a postal code based on the specified country code.
 * @param {string} value - The postal code to format.
 * @param {string} countryCode - The country code to use for formatting.
 * @returns {string} The formatted postal code.
 */
export default function postalCode(value: string, countryCode: string): string {
	if (!countryCode || !POSTAL_CODES || !POSTAL_CODES[countryCode]) {
		return value // No formatting if country code is missing or invalid
	}

	const format = POSTAL_CODES[countryCode].format
	const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, "")

	let formattedValue = ""
	let valueIndex = 0

	for (let i = 0; i < format.length; i++) {
		if (valueIndex >= cleanedValue.length) {
			break // Stop if we run out of input characters
		}

		if (format[i] === "X") {
			if (/[A-Za-z]/.test(cleanedValue[valueIndex])) {
				formattedValue += cleanedValue[valueIndex].toUpperCase()
				valueIndex++
			} else {
				break // Stop if the character is not a letter
			}
		} else if (format[i] === "0") {
			if (/[0-9]/.test(cleanedValue[valueIndex])) {
				formattedValue += cleanedValue[valueIndex]
				valueIndex++
			} else {
				break // Stop if the character is not a digit
			}
		} else {
			formattedValue += format[i] // Add the formatting character
		}
	}

	return formattedValue
}
