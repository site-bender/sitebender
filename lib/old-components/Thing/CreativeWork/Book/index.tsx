import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"
import type {
	CitationStyle,
	SupportedLocale,
} from "../../helpers/i18n/localeFormats/index.ts"
import type { BCP47LanguageTag } from "../../types/bcp47/index.ts"
import type { BookProps } from "../../types/index.ts"

import cleanObject from "../../helpers/createJsonLdScript/cleanObject/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"
import autoWrapBareVariables from "../../helpers/formatTemplate/autoWrapBareVariables/index.ts"
import { BOOK_FORMATS } from "../../helpers/formatTemplate/formats/index.ts"
import { setLocaleContext } from "../../helpers/formatTemplate/formattingFunctions/i18nFunctions/index.ts"
import safeFormatTemplate from "../../helpers/formatTemplate/safeFormatTemplate/index.ts"
import { detectLanguageForTranslations } from "../../helpers/languageDetection/index.ts"
import { getOrElse } from "../../types/Result/index.ts"

// Component properties with translation support
type Props = BookProps & {
	title: string // The book title
	children?: never // Prevent children - use explicit title prop instead
	format?: keyof typeof BOOK_FORMATS | string
	locale?: SupportedLocale // For backward compatibility with existing i18n system
	citationStyle?: CitationStyle
	itemProp?: string
	disableMicrodata?: boolean
	disableLinkedData?: boolean
	onError?: (error: string) => void
	class?: string
	id?: string
	style?: string

	// Translation-specific props (from BookProps)
	// locale?: BCP47LanguageTag // Primary language/locale (already inherited from BookProps)
	// translations?: TranslationCollection // Translation data (already inherited from BookProps)
	userPreference?: BCP47LanguageTag // User language preference override
}

export default function Book({
	title,
	format = "title",
	locale = "en-US",
	citationStyle = "apa",
	author,
	publisher,
	datePublished,
	isbn,
	editor,
	translator,
	bookEdition,
	numberOfPages,
	genre,
	inLanguage,
	itemProp,
	disableMicrodata = false,
	disableLinkedData = false,
	onError,
	class: additionalClass,
	id,
	style,
	userPreference,
	// BookProps translation fields
	locale: primaryLocale,
	translations,
}: Props) {
	// Language detection for translations
	const effectiveLocale = primaryLocale || (locale as BCP47LanguageTag)
	const languageDetection = detectLanguageForTranslations(
		effectiveLocale,
		translations,
		userPreference,
	)

	// Use the best available translation or fallback to effective locale
	const displayLocale = languageDetection.bestTranslation?.language ||
		effectiveLocale
	const translationData = languageDetection.bestTranslation?.data

	// Set locale context for i18n functions (backward compatibility)
	setLocaleContext(locale, citationStyle)

	// Determine template with enhanced i18n support
	const template = format.includes("{")
		? format // Custom template
		: format in BOOK_FORMATS
		? BOOK_FORMATS[format as keyof typeof BOOK_FORMATS]
		: BOOK_FORMATS.title // Fallback

	// Enhanced template with auto-wrapped bare variables
	const enhancedTemplate = autoWrapBareVariables(template, locale)

	// Prepare template data with i18n-aware values
	const templateData = {
		title,
		author: author || "",
		publisher: publisher || "",
		datePublished: datePublished || "",
		isbn: isbn || "",
		editor: editor || "",
		translator: translator || "",
		bookEdition: bookEdition || "",
		numberOfPages: numberOfPages || "",
		genre: genre || "",
		inLanguage: inLanguage || displayLocale,
		year: datePublished ? new Date(datePublished).getFullYear().toString() : "",
		formattedDate: datePublished ? "{{formatDate(datePublished)}}" : "",
	}

	// Use safe template formatting with FP error handling
	const formatResult = safeFormatTemplate(enhancedTemplate, templateData)

	// Handle errors functionally
	const content = getOrElse(formatResult, title) // Fallback to plain title

	// Report errors if handler provided
	if (!formatResult.success && onError) {
		onError(`Template formatting failed: ${formatResult.error}`)
	}

	// Build locale-aware class names
	const classNames = [
		`book`,
		`genre-${genre || "unspecified"}`,
		`locale-${displayLocale}`,
		`citation-${citationStyle}`,
	]
	if (additionalClass) {
		classNames.push(additionalClass)
	}

	// Add translation indicator class if translations are available
	if (translations && Object.keys(translations).length > 0) {
		classNames.push(`has-translations`)
	}

	// Generate JSON-LD with locale awareness (by default unless disabled)
	const jsonLdData = !disableLinkedData
		? {
			"@context": "https://schema.org",
			"@type": "Book",
			"name": title,
			"author": author ? { "@type": "Person", "name": author } : undefined,
			"publisher": publisher
				? { "@type": "Organization", "name": publisher }
				: undefined,
			"datePublished": datePublished,
			"isbn": isbn,
			"editor": editor,
			"translator": translator,
			"bookEdition": bookEdition,
			"numberOfPages": numberOfPages,
			"genre": genre,
			"inLanguage": inLanguage || displayLocale,
			// Add translation data as workTranslation
			"workTranslation": translations && Object.keys(translations).length > 0
				? Object.entries(translations).map(([langCode, translationData]) => ({
					"@type": "Book",
					"name": translationData.title || title,
					"inLanguage": langCode,
					"datePublished": translationData.publishedYear ||
						translationData.datePublished,
					"translator": translationData.translator
						? { "@type": "Person", "name": translationData.translator }
						: undefined,
					"publisher": translationData.publisherImprint
						? {
							"@type": "Organization",
							"name": translationData.publisherImprint,
						}
						: undefined,
					"isbn": translationData.isbn,
					"bookEdition": translationData.edition,
					"additionalProperty": translationData.quality
						? {
							"@type": "PropertyValue",
							"name": "translation-quality",
							"value": translationData.quality,
						}
						: undefined,
				})).filter((translation) => translation.name) // Only include translations with titles
				: undefined,
		}
		: null

	return (
		<span
			class={classNames.join(" ")}
			{...(!disableMicrodata && {
				itemScope: true,
				itemType: "https://schema.org/Book",
				itemProp: itemProp,
			})}
			lang={inLanguage || displayLocale}
			id={id}
			style={style}
			{...(translations && Object.keys(translations).length > 0 && {
				"data-translation-source": "title",
			})}
		>
			{content}

			{/* Translation metadata as microdata meta tags - nested within itemScope */}
			{translations && Object.keys(translations).length > 0 && (
				<>
					{Object.entries(translations).map(([langCode, translationData]) => (
						<meta
							key={langCode}
							data-source="title"
							data-lang={langCode}
							data-translation={translationData.title || ""}
							data-translator={translationData.translator || ""}
							data-quality={translationData.quality || ""}
							data-published-year={translationData.publishedYear || ""}
							{...(!disableMicrodata && {
								itemProp: "workTranslation",
								itemScope: true,
								itemType: "https://schema.org/Book",
							})}
						/>
					))}
				</>
			)}

			{/* JSON-LD script nested within the component */}
			{createJsonLdScript(jsonLdData as JsonObject)}
		</span>
	)
}
