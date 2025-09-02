function creditCard(value) {
	const digitsOnly = value.replace(/\D/g, "").slice(0, 16)
	const groups = digitsOnly.match(/(\d{1,4})/g) || []
	return groups.join(" ")
}
export { creditCard as default }
