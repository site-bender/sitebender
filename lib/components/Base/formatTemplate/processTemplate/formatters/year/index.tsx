export default function year(
	value: unknown,
	params?: Record<string, unknown>,
): string {
	if (value === "UNKNOWN") {
		return "UNKNOWN"
	}

	const dateString = String(value)

	try {
		// Try to parse as Date
		const date = new Date(dateString)

		if (isNaN(date.getTime())) {
			// Try to extract year from string (e.g., "2025-01-01" -> "2025")
			const yearMatch = dateString.match(/(\d{4})/)
			return yearMatch ? yearMatch[1] : "UNKNOWN"
		}

		const format = params?.format as string

		switch (format) {
			case "short":
				// Last 2 digits of year
				return String(date.getFullYear()).slice(-2)
			case "long":
			default:
				// Full 4-digit year
				return String(date.getFullYear())
		}
	} catch {
		return "UNKNOWN"
	}
}
