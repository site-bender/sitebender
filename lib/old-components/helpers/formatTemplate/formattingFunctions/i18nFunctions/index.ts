import type { PersonName } from "../../../../types/index.ts"

import {
	type CitationStyle,
	type DateStyle,
	formatCitationAuthor,
	formatDate,
	formatQuote,
	formatYear,
	type SupportedLocale,
} from "../../../i18n/localeFormats/index.ts"

// Current locale context (could be set globally or per component)
let currentLocale: SupportedLocale = "en-US"
let currentCitationStyle: CitationStyle = "apa"

export function setLocaleContext(
	locale: SupportedLocale,
	citationStyle: CitationStyle = "apa",
): void {
	currentLocale = locale
	currentCitationStyle = citationStyle
}

// Helper function to parse name string into structured format (fallback only)
function parseNameString(fullName: string): PersonName {
	const parts = fullName.trim().split(/\s+/)
	if (parts.length === 1) {
		return { familyName: parts[0] }
	} else if (parts.length === 2) {
		return { givenName: parts[0], familyName: parts[1] }
	} else {
		// More than 2 parts - assume first is given, last is family, rest are additional
		return {
			givenName: parts[0],
			additionalName: parts.slice(1, -1).join(" "),
			familyName: parts[parts.length - 1],
		}
	}
}

// Get locale-aware "by" translation
function getByWord(locale: SupportedLocale): string {
	if (locale.startsWith("de-")) return "von"
	if (locale.startsWith("fr-")) return "par"
	if (locale.startsWith("es-")) return "por"
	if (locale.startsWith("it-")) return "di"
	if (locale.startsWith("pt-")) return "por"
	if (locale.startsWith("ja-")) return "" // Japanese doesn't use "by"
	if (locale.startsWith("zh-")) return "作者："
	return "by" // English and fallback
}

// Locale-aware formatting functions
export const I18N_FORMATTING_FUNCTIONS = {
	// Date formatting
	formatDate: (date: string, style: DateStyle = "medium") =>
		formatDate(date, currentLocale, style),

	formatYear: (date: string) => formatYear(date, currentLocale),

	// Quotation marks
	quote: (text: string) => formatQuote(text, currentLocale, "primary"),
	quoteSecondary: (text: string) =>
		formatQuote(text, currentLocale, "secondary"),

	// Citation-specific formatting
	citationAuthor: (firstName: string, lastName: string) =>
		formatCitationAuthor(
			firstName,
			lastName,
			currentLocale,
			currentCitationStyle,
		),

	// Name formatting functions
	formatName: (nameData: string | PersonName) => {
		if (typeof nameData === "string") {
			return nameData
		}
		const { givenName, familyName, additionalName, fullName } = nameData
		if (fullName) return fullName

		const parts: string[] = []
		if (givenName) parts.push(givenName)
		if (additionalName) parts.push(additionalName)
		if (familyName) parts.push(familyName)
		return parts.join(" ")
	},

	lastFirst: (nameData: string | PersonName) => {
		let parsed: PersonName
		if (typeof nameData === "string") {
			parsed = parseNameString(nameData)
		} else {
			parsed = nameData
		}

		const { givenName, familyName, additionalName } = parsed
		if (!familyName) return typeof nameData === "string" ? nameData : ""

		// Format as "Last, F." for citations
		const firstInitial = givenName ? givenName.charAt(0) + "." : ""
		const additionalInitial = additionalName
			? additionalName.charAt(0) + "."
			: ""

		if (firstInitial && additionalInitial) {
			return `${familyName}, ${firstInitial}${additionalInitial}`
		} else if (firstInitial) {
			return `${familyName}, ${firstInitial}`
		} else {
			return familyName
		}
	},

	// MLA-style name formatting with full names
	mlaName: (nameData: string | PersonName) => {
		let parsed: PersonName
		if (typeof nameData === "string") {
			parsed = parseNameString(nameData)
		} else {
			parsed = nameData
		}

		const { givenName, familyName, additionalName } = parsed
		if (!familyName) return typeof nameData === "string" ? nameData : ""

		// Format as "Last, First" for MLA citations
		const parts: string[] = [familyName]
		if (givenName) {
			if (additionalName) {
				parts.push(` ${givenName} ${additionalName}`)
			} else {
				parts.push(` ${givenName}`)
			}
		}
		return parts.join(",")
	},

	// Locale-aware "by" word
	byWord: () => getByWord(currentLocale),

	// Locale-aware title formatting for books
	bookTitle: (title: string) => {
		// Different locales have different conventions for book titles
		if (currentLocale.startsWith("ja-") || currentLocale.startsWith("zh-")) {
			// Asian locales: use quotation marks
			return formatQuote(title, currentLocale, "primary")
		} else if (
			currentLocale.startsWith("de-") ||
			currentLocale.startsWith("fr-") ||
			currentLocale.startsWith("es-") ||
			currentLocale.startsWith("it-")
		) {
			// European locales often use quotation marks for book titles
			return formatQuote(title, currentLocale, "primary")
		} else {
			// English and other locales typically italicize book titles
			return `<cite>${title}</cite>`
		}
	},

	// Locale-aware title formatting (general)
	titleQuote: (title: string) => {
		// Articles and short works get quoted, books get italicized
		return formatQuote(title, currentLocale, "primary")
	},

	// Set locale within template (for per-component locale)
	withLocale: (locale: SupportedLocale, content: string) => {
		const previousLocale = currentLocale
		currentLocale = locale
		const result = content // In real usage, this would re-process the content
		currentLocale = previousLocale
		return result
	},
} as const

export default I18N_FORMATTING_FUNCTIONS
