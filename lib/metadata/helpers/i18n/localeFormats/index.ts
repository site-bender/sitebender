export type SupportedLocale =
	| "en-US"
	| "en-GB"
	| "en-CA"
	| "en-AU" // English variants
	| "es-ES"
	| "es-MX"
	| "es-AR" // Spanish variants
	| "fr-FR"
	| "fr-CA"
	| "fr-BE"
	| "fr-CH" // French variants
	| "de-DE"
	| "de-AT"
	| "de-CH" // German variants
	| "pt-BR"
	| "pt-PT" // Portuguese variants
	| "it-IT"
	| "nl-NL"
	| "sv-SE"
	| "da-DK" // Other European
	| "ja-JP"
	| "ko-KR"
	| "zh-CN"
	| "zh-TW" // East Asian
	| "ar-SA"
	| "he-IL"
	| "ru-RU" // Other scripts

export type DateStyle = "full" | "long" | "medium" | "short"

export type CitationStyle = "apa" | "mla" | "chicago" | "harvard" | "ieee"

// Date formatting by locale
export function formatDate(
	date: string | Date,
	locale: SupportedLocale = "en-US",
	style: DateStyle = "medium",
): string {
	try {
		const dateObj = typeof date === "string" ? new Date(date) : date
		return new Intl.DateTimeFormat(locale, {
			dateStyle: style,
		}).format(dateObj)
	} catch {
		// Fallback to ISO string
		return typeof date === "string" ? date : date.toISOString().split("T")[0]
	}
}

// Year extraction with locale awareness
export function formatYear(
	date: string | Date,
	locale: SupportedLocale = "en-US",
): string {
	try {
		const dateObj = typeof date === "string" ? new Date(date) : date
		return new Intl.DateTimeFormat(locale, {
			year: "numeric",
		}).format(dateObj)
	} catch {
		// Fallback extraction
		const dateStr = typeof date === "string" ? date : date.toISOString()
		return dateStr.split("-")[0] || ""
	}
}

// Number formatting (for page numbers, volumes, etc.)
export function formatNumber(
	num: number | string,
	locale: SupportedLocale = "en-US",
): string {
	const number = typeof num === "string" ? parseInt(num, 10) : num
	if (isNaN(number)) return String(num)

	return new Intl.NumberFormat(locale).format(number)
}

// Proper typographic quotes
const LEFT_DOUBLE_QUOTE = "“"
const RIGHT_DOUBLE_QUOTE = "”"
const LEFT_SINGLE_QUOTE = "‘"
const RIGHT_SINGLE_QUOTE = "’"

// Quotation marks by locale using proper Unicode typography
export const QUOTATION_MARKS: Record<SupportedLocale, {
	primary: [string, string]
	secondary: [string, string]
}> = {
	"en-US": {
		primary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},
	"en-GB": {
		primary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
		secondary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
	},
	"en-CA": {
		primary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},
	"en-AU": {
		primary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
		secondary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
	},

	"fr-FR": {
		primary: ["«", "»"],
		secondary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
	},
	"fr-CA": {
		primary: ["«", "»"],
		secondary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
	},
	"fr-BE": {
		primary: ["«", "»"],
		secondary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
	},
	"fr-CH": {
		primary: ["«", "»"],
		secondary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
	},

	"de-DE": {
		primary: ["„", RIGHT_DOUBLE_QUOTE],
		secondary: ["‚", RIGHT_SINGLE_QUOTE],
	},
	"de-AT": {
		primary: ["„", RIGHT_DOUBLE_QUOTE],
		secondary: ["‚", RIGHT_SINGLE_QUOTE],
	},
	"de-CH": { primary: ["«", "»"], secondary: ["‹", "›"] },

	"es-ES": {
		primary: ["«", "»"],
		secondary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
	},
	"es-MX": {
		primary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},
	"es-AR": {
		primary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},

	"pt-BR": {
		primary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},
	"pt-PT": {
		primary: ["«", "»"],
		secondary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
	},

	"it-IT": {
		primary: ["«", "»"],
		secondary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
	},
	"nl-NL": {
		primary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},
	"sv-SE": {
		primary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},
	"da-DK": { primary: ["»", "«"], secondary: ["›", "‹"] },

	"ja-JP": { primary: ["「", "」"], secondary: ["『", "』"] },
	"ko-KR": {
		primary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},
	"zh-CN": {
		primary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},
	"zh-TW": { primary: ["「", "」"], secondary: ["『", "』"] },

	"ar-SA": {
		primary: ["«", "»"],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},
	"he-IL": {
		primary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
		secondary: [LEFT_SINGLE_QUOTE, RIGHT_SINGLE_QUOTE],
	},
	"ru-RU": {
		primary: ["«", "»"],
		secondary: [LEFT_DOUBLE_QUOTE, RIGHT_DOUBLE_QUOTE],
	},
}

export function formatQuote(
	text: string,
	locale: SupportedLocale = "en-US",
	level: "primary" | "secondary" = "primary",
): string {
	const marks = QUOTATION_MARKS[locale] || QUOTATION_MARKS["en-US"]
	const [open, close] = marks[level]
	return `${open}${text}${close}`
}

// Name formatting by culture
export function formatPersonName(
	firstName: string,
	lastName: string,
	locale: SupportedLocale = "en-US",
): string {
	// Most Western cultures: First Last
	if (
		locale.startsWith("en-") || locale.startsWith("fr-") ||
		locale.startsWith("de-") || locale.startsWith("es-") ||
		locale.startsWith("pt-") || locale.startsWith("it-") ||
		locale.startsWith("nl-") || locale.startsWith("sv-") ||
		locale.startsWith("da-")
	) {
		return `${firstName} ${lastName}`
	}

	// East Asian cultures: Last First (no comma in modern usage)
	if (
		locale.startsWith("ja-") || locale.startsWith("ko-") ||
		locale.startsWith("zh-")
	) {
		return `${lastName} ${firstName}`
	}

	// Default to Western format
	return `${firstName} ${lastName}`
}

// Citation author formatting
export function formatCitationAuthor(
	firstName: string,
	lastName: string,
	locale: SupportedLocale = "en-US",
	style: CitationStyle = "apa",
): string {
	const fullName = formatPersonName(firstName, lastName, locale)

	switch (style) {
		case "apa":
		case "chicago":
			// Last, F.
			return `${lastName}, ${firstName.charAt(0)}.`
		case "mla":
			// Last, First
			return `${lastName}, ${firstName}`
		case "harvard":
			// Last, F.
			return `${lastName}, ${firstName.charAt(0)}.`
		case "ieee":
			// F. Last
			return `${firstName.charAt(0)}. ${lastName}`
		default:
			return fullName
	}
}
