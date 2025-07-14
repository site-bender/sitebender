import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"
import type {
	CitationStyle,
	SupportedLocale,
} from "../../helpers/i18n/localeFormats/index.ts"
import type { BCP47LanguageTag } from "../../types/bcp47/index.ts"
import type { TranslationCollection } from "../../types/index.ts"

import cleanObject from "../../helpers/createJsonLdScript/cleanObject/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"
import autoWrapBareVariables from "../../helpers/formatTemplate/autoWrapBareVariables/index.ts"
import { ARTICLE_FORMATS } from "../../helpers/formatTemplate/formats/index.ts"
import { setLocaleContext } from "../../helpers/formatTemplate/formattingFunctions/i18nFunctions/index.ts"
import safeFormatTemplate from "../../helpers/formatTemplate/safeFormatTemplate/index.ts"
import { detectLanguageForTranslations } from "../../helpers/languageDetection/index.ts"
import { getOrElse } from "../../types/Result/index.ts"

type Props = {
	title: string // The article title (schema.org headline)
	children?: never // Prevent children - use explicit title prop instead
	author?: string
	journal?: string
	volume?: string | number
	issue?: string | number
	pageStart?: string | number
	pageEnd?: string | number
	datePublished?: string
	doi?: string
	format?: keyof typeof ARTICLE_FORMATS | string
	locale?: SupportedLocale // For backward compatibility with existing i18n system
	citationStyle?: CitationStyle
	itemProp?: string
	disableMicrodata?: boolean
	disableLinkedData?: boolean
	onError?: (error: string) => void
	class?: string
	id?: string
	style?: string

	// Translation support (from CreativeWorkProps)
	primaryLocale?: BCP47LanguageTag // Primary language/locale of the content
	translations?: TranslationCollection // Translation data for multiple languages
	userPreference?: BCP47LanguageTag // User language preference override
}

export default function Article({
	title,
	author,
	journal,
	volume,
	issue,
	pageStart,
	pageEnd,
	datePublished,
	doi,
	format = "titleOnly",
	locale = "en-US",
	citationStyle = "apa",
	itemProp = "name",
	disableMicrodata = false,
	disableLinkedData = false,
	onError,
	class: additionalClass,
	id,
	style,
	userPreference,
	primaryLocale,
	translations,
	...props
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
		: format in ARTICLE_FORMATS
		? ARTICLE_FORMATS[format as keyof typeof ARTICLE_FORMATS]
		: ARTICLE_FORMATS.titleOnly // Fallback

	// Enhanced template with auto-wrapped bare variables
	const enhancedTemplate = autoWrapBareVariables(template, locale)

	// Prepare template data with i18n-aware values
	const templateData = {
		title,
		author: author || "",
		journal: journal || "",
		volume: volume || "",
		issue: issue || "",
		pageStart: pageStart || "",
		pageEnd: pageEnd || "",
		datePublished: datePublished || "",
		doi: doi || "",
		year: datePublished ? new Date(datePublished).getFullYear().toString() : "",
		formattedDate: datePublished ? "{{formatDate(datePublished)}}" : "",
	}

	// Use safe template formatting with FP error handling
	const formatResult = safeFormatTemplate(enhancedTemplate, templateData)

	// Handle errors functionally
	const content = getOrElse(formatResult, `"${title}"`) // Fallback to quoted title

	// Report errors if handler provided
	if (!formatResult.success && onError) {
		onError(`Template formatting failed: ${formatResult.error}`)
	}

	// Build locale-aware class names
	const classNames = [
		`article`,
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
			"@type": "Article",
			headline: title,
			...(author ? { author: { "@type": "Person", name: author } } : {}),
			...(journal
				? {
					isPartOf: {
						"@type": "Periodical",
						name: journal,
						...(volume ? { volumeNumber: String(volume) } : {}),
						...(issue ? { issueNumber: String(issue) } : {}),
					},
				}
				: {}),
			...(pageStart ? { pageStart: String(pageStart) } : {}),
			...(pageEnd ? { pageEnd: String(pageEnd) } : {}),
			...(datePublished ? { datePublished } : {}),
			...(doi ? { sameAs: `https://doi.org/${doi}` } : {}),
			inLanguage: displayLocale,
			// Add translation data as workTranslation
			workTranslation: translations && Object.keys(translations).length > 0
				? Object.entries(translations).map(([langCode, translationData]) => ({
					"@type": "Article",
					"headline": translationData.title || title,
					"inLanguage": langCode,
					"datePublished": translationData.publishedYear ||
						translationData.datePublished,
					"translator": translationData.translator
						? { "@type": "Person", "name": translationData.translator }
						: undefined,
					"isPartOf": translationData.publisherImprint
						? {
							"@type": "Periodical",
							"name": translationData.publisherImprint,
						}
						: undefined,
					"sameAs": translationData.isbn
						? `https://doi.org/${translationData.isbn}`
						: undefined,
					"additionalProperty": translationData.quality
						? {
							"@type": "PropertyValue",
							"name": "translation-quality",
							"value": translationData.quality,
						}
						: undefined,
				})).filter((translation) => translation.headline) // Only include translations with titles
				: undefined,
		}
		: null

	return (
		<cite
			class={classNames.join(" ")}
			{...(!disableMicrodata && {
				itemScope: true,
				itemType: "https://schema.org/Article",
				itemProp: itemProp,
			})}
			data-work-type="article"
			lang={displayLocale}
			id={id}
			style={style}
			{...(translations && Object.keys(translations).length > 0 && {
				"data-translation-source": "title",
			})}
			{...props}
		>
			{content}

			{/* Existing microdata - nested within itemScope */}
			{!disableMicrodata && (
				<>
					{author && <meta itemProp="author" content={author} />}
					{journal && <meta itemProp="isPartOf" content={journal} />}
					{volume && <meta itemProp="volumeNumber" content={String(volume)} />}
					{issue && <meta itemProp="issueNumber" content={String(issue)} />}
					{pageStart && (
						<meta itemProp="pageStart" content={String(pageStart)} />
					)}
					{pageEnd && <meta itemProp="pageEnd" content={String(pageEnd)} />}
					{datePublished && (
						<meta itemProp="datePublished" content={datePublished} />
					)}
					{doi && <meta itemProp="sameAs" content={`https://doi.org/${doi}`} />}
				</>
			)}

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
								itemType: "https://schema.org/Article",
							})}
						/>
					))}
				</>
			)}

			{/* JSON-LD script nested within the component */}
			{createJsonLdScript(jsonLdData as JsonObject)}
		</cite>
	)
}
