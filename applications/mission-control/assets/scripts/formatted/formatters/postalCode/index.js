const getPostalCodes = async () => {
	const response = await fetch("../../../../../json/postalCodes/index.json")
	return await response.json()
}
const POSTAL_CODES = await getPostalCodes()
function postalCode(value, countryCode) {
	if (!countryCode || !POSTAL_CODES || !POSTAL_CODES[countryCode]) {
		return value
	}
	const format = POSTAL_CODES[countryCode].format
	const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, "")
	let formattedValue = ""
	let valueIndex = 0
	for (let i = 0; i < format.length; i++) {
		if (valueIndex >= cleanedValue.length) {
			break
		}
		if (format[i] === "X") {
			if (/[A-Za-z]/.test(cleanedValue[valueIndex])) {
				formattedValue += cleanedValue[valueIndex].toUpperCase()
				valueIndex++
			} else {
				break
			}
		} else if (format[i] === "0") {
			if (/[0-9]/.test(cleanedValue[valueIndex])) {
				formattedValue += cleanedValue[valueIndex]
				valueIndex++
			} else {
				break
			}
		} else {
			formattedValue += format[i]
		}
	}
	return formattedValue
}
export { postalCode as default }
