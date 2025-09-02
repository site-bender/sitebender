function isbn10(digits) {
	const parts = []
	if (digits.length > 0) {
		parts.push(digits.slice(0, 1))
	}
	if (digits.length > 1) {
		parts.push(digits.slice(1, 6))
	}
	if (digits.length > 6) {
		parts.push(digits.slice(6, 9))
	}
	if (digits.length > 9) {
		parts.push(digits.slice(9))
	}
	return parts.join("-")
}
function isbn13(digits) {
	const parts = []
	if (digits.length > 0) {
		parts.push(digits.slice(0, 3))
	}
	if (digits.length > 3) {
		parts.push(digits.slice(3, 4))
	}
	if (digits.length > 4) {
		parts.push(digits.slice(4, 9))
	}
	if (digits.length > 9) {
		parts.push(digits.slice(9, 12))
	}
	if (digits.length > 12) {
		parts.push(digits.slice(12))
	}
	return parts.join("-")
}
function isbn(input) {
	const cleanedDigits = input.replace(/\D/g, "")
	if (cleanedDigits.length === 0) {
		return ""
	}
	if (cleanedDigits[0] !== "9") {
		return isbn10(cleanedDigits.slice(0, 10))
	}
	if (cleanedDigits.length >= 2 && cleanedDigits[1] !== "7") {
		return isbn10(cleanedDigits.slice(0, 10))
	}
	if (
		cleanedDigits.length >= 3 && ![
			"8",
			"9",
		].includes(cleanedDigits[2])
	) {
		return isbn10(cleanedDigits.slice(0, 10))
	}
	if (
		cleanedDigits.length >= 3 && [
			"978",
			"979",
		].includes(cleanedDigits.slice(0, 3))
	) {
		return isbn13(cleanedDigits.slice(0, 13))
	}
	return cleanedDigits
}
export { isbn as default }
