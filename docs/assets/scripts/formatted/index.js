document.addEventListener("DOMContentLoaded", () => {
	const formattedFields = document.querySelectorAll(
		".formatted-field input[data-format]",
	)
	formattedFields.forEach(async (f) => {
		const field = f
		const formatName = field.dataset.format
		const countryCode = field.dataset.countryCode
		try {
			const { default: format } = await import(
				`./formatters/${formatName}/index.js`
			)
			if (formatName === "postalCode" && countryCode) {
				fetch("../../../json/postalCodes/index.json").then((response) =>
					response.json()
				).then((POSTAL_CODES) => {
					if (POSTAL_CODES[countryCode]) {
						field.pattern = POSTAL_CODES[countryCode].pattern.replace(
							/\\/g,
							"\\\\",
						)
						const helpId = field.getAttribute("aria-describedby")
						if (helpId) {
							const helpElement = document.getElementById(helpId)
							if (helpElement) {
								helpElement.textContent = POSTAL_CODES[countryCode].description
							}
						}
					}
				})
			}
			field.addEventListener("input", () => {
				field.value = format(field.value, countryCode)
			})
			field.addEventListener("blur", () => {
				field.dataset.formattedValue = field.value
			})
			field.addEventListener("focus", () => {
				field.value = field.dataset.formattedValue || field.value
			})
		} catch (error) {
			console.error("Error loading format function:", error)
		}
	})
})
