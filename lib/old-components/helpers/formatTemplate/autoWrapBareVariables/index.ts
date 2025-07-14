import type { SupportedLocale } from "../../i18n/localeFormats/index.ts"

// Map of bare variables to their formatted versions
const AUTO_WRAP_MAP = {
	// Names - always need proper formatting
	author: "formatName(author)",
	director: "formatName(director)",
	editor: "formatName(editor)",
	translator: "formatName(translator)",

	// Linked identifiers - should always be linkable
	doi: "linkDoi(doi)",
	isbn: "linkIsbn(isbn)",

	// Publications - need semantic markup
	journal: "italicize(journal)",
	// Publisher/Studio - could be semantic but debatable
	// publisher: "cite(publisher)",
	// studio: "cite(studio)",
} as const

// Special cases that depend on locale
const LOCALE_AWARE_MAP = {
	title: (locale: SupportedLocale) =>
		locale.startsWith("en-") ? "cite(title)" : "titleQuote(title)",
} as const

export default function autoWrapBareVariables(
	template: string,
	locale: SupportedLocale = "en-US",
): string {
	// Apply locale-aware replacements first
	let result = template
	for (const [variable, getWrapper] of Object.entries(LOCALE_AWARE_MAP)) {
		const pattern = new RegExp(`\\{\\{${variable}\\}\\}`, "g")
		result = result.replace(pattern, `{{${getWrapper(locale)}}}`)
	}

	// Apply standard auto-wrapping
	for (const [variable, wrapper] of Object.entries(AUTO_WRAP_MAP)) {
		const pattern = new RegExp(`\\{\\{${variable}\\}\\}`, "g")
		result = result.replace(pattern, `{{${wrapper}}}`)
	}

	return result
}

export { AUTO_WRAP_MAP, LOCALE_AWARE_MAP }
