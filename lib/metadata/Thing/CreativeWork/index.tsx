import type {
	CitationStyle,
	SupportedLocale,
} from "../../helpers/i18n/localeFormats/index.ts"
import type { BCP47LanguageTag } from "../../types/bcp47/index.ts"
import type {
	CreativeWorkProps,
	TranslationCollection,
} from "../../types/index.ts"

import cleanObject from "../../helpers/createJsonLdScript/cleanObject/index.ts"
import autoWrapBareVariables from "../../helpers/formatTemplate/autoWrapBareVariables/index.ts"
import { CREATIVE_WORK_FORMATS } from "../../helpers/formatTemplate/formats/index.ts"
import { setLocaleContext } from "../../helpers/formatTemplate/formattingFunctions/i18nFunctions/index.ts"
import safeFormatTemplate from "../../helpers/formatTemplate/safeFormatTemplate/index.ts"
import { detectLanguageForTranslations } from "../../helpers/languageDetection/index.ts"
import { getOrElse } from "../../types/Result/index.ts"

// Schema.org type override for specific CreativeWork subtypes
export type SchemaOverride = {
	type: string // The specific Schema.org type (e.g., "ComicStory", "Clip", "HowToSection")
	additionalProperties?: Record<string, any> // Type-specific properties
}

// Component properties with translation support
type Props = CreativeWorkProps & {
	title: string // The creative work title (schema.org name)
	children?: never // Prevent children - use explicit title prop instead
	format?: keyof typeof CREATIVE_WORK_FORMATS | string
	locale?: SupportedLocale // For backward compatibility with existing i18n system
	citationStyle?: CitationStyle
	itemProp?: string
	disableMicrodata?: boolean
	disableLinkedData?: boolean
	onError?: (error: string) => void
	class?: string
	id?: string
	style?: string

	// Schema.org type specificity
	schemaOverride?: SchemaOverride // Override the generic CreativeWork type and add specific properties

	// Translation-specific props
	userPreference?: BCP47LanguageTag // User language preference override
	primaryLocale?: BCP47LanguageTag // Primary language/locale of the content
	translations?: TranslationCollection // Translation data for multiple languages
}

export default function CreativeWork({
	title,
	format = "title",
	locale = "en-US",
	citationStyle = "apa",
	author,
	publisher,
	datePublished,
	dateCreated,
	dateModified,
	editor,
	contributor,
	creator,
	genre,
	keywords,
	inLanguage,
	description,
	abstract,
	headline,
	url,
	itemProp,
	disableMicrodata = false,
	disableLinkedData = false,
	onError,
	class: additionalClass,
	id,
	style,
	schemaOverride,
	userPreference,
	primaryLocale,
	translations,
	...props
}: Props) {
	// Language detection for translations
	const effectiveLocale = primaryLocale || (inLanguage as BCP47LanguageTag) ||
		(locale as BCP47LanguageTag)
	const languageDetection = detectLanguageForTranslations(
		effectiveLocale,
		translations,
		userPreference,
	)

	// Set locale context for i18n functions (backward compatibility)
	setLocaleContext(locale, citationStyle)

	// Determine template with enhanced i18n support
	const template = format.includes("{")
		? format // Custom template
		: format in CREATIVE_WORK_FORMATS
		? CREATIVE_WORK_FORMATS[format as keyof typeof CREATIVE_WORK_FORMATS]
		: CREATIVE_WORK_FORMATS.title // Fallback

	// Enhanced template with auto-wrapped bare variables
	const enhancedTemplate = autoWrapBareVariables(template, locale)

	// Prepare template data with i18n-aware values
	const templateData = {
		title,
		author: author || "",
		publisher: publisher || "",
		datePublished: datePublished || "",
		dateCreated: dateCreated || "",
		dateModified: dateModified || "",
		editor: editor || "",
		contributor: contributor || "",
		creator: creator || "",
		genre: genre || "",
		keywords: keywords || "",
		inLanguage: inLanguage || effectiveLocale,
		description: description || "",
		abstract: abstract || "",
		headline: headline || title,
		url: url || "",
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
		`creative-work`,
		`locale-${effectiveLocale}`,
		`citation-${citationStyle}`,
	]
	if (genre) {
		classNames.push(`genre-${genre.toLowerCase().replace(/\s+/g, "-")}`)
	}
	if (additionalClass) {
		classNames.push(additionalClass)
	}

	// Add translation indicator class if translations are available
	if (translations && Object.keys(translations).length > 0) {
		classNames.push(`has-translations`)
	}

	// Determine Schema.org type and additional properties
	const schemaType = schemaOverride?.type || "CreativeWork"
	const additionalSchemaProps = schemaOverride?.additionalProperties || {}

	// Generate JSON-LD with locale awareness (by default unless disabled)
	const rawJsonLd = !disableLinkedData
		? {
			"@context": "https://schema.org",
			"@type": schemaType,
			"name": title,
			"headline": headline || title,
			"author": author ? { "@type": "Person", "name": author } : undefined,
			"publisher": publisher
				? { "@type": "Organization", "name": publisher }
				: undefined,
			"editor": editor ? { "@type": "Person", "name": editor } : undefined,
			"contributor": contributor
				? { "@type": "Person", "name": contributor }
				: undefined,
			"creator": creator ? { "@type": "Person", "name": creator } : undefined,
			"datePublished": datePublished,
			"dateCreated": dateCreated,
			"dateModified": dateModified,
			"genre": genre,
			"keywords": keywords,
			"description": description,
			"abstract": abstract,
			"url": url,
			"inLanguage": inLanguage || effectiveLocale,
			// Add any additional properties from schemaOverride
			...additionalSchemaProps,
			// Add translation data as workTranslation
			"workTranslation": translations && Object.keys(translations).length > 0
				? Object.entries(translations).map(([langCode, translationData]) => ({
					"@type": schemaType,
					"name": translationData.title || title,
					"headline": translationData.title || title,
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

	// Clean the JSON-LD to remove undefined values
	const jsonLd = rawJsonLd ? cleanObject(rawJsonLd as any) : null

	return (
		<cite
			class={classNames.join(" ")}
			{...(!disableMicrodata && {
				itemScope: true,
				itemType: `https://schema.org/${schemaType}`,
				itemProp: itemProp,
			})}
			data-work-type={schemaType.toLowerCase().replace(/([A-Z])/g, "-$1")
				.substring(1)}
			lang={inLanguage || effectiveLocale}
			id={id}
			style={style}
			{...(translations && Object.keys(translations).length > 0 && {
				"data-translation-source": "title",
			})}
			{...props}
		>
			{content}

			{/* Microdata meta tags - nested within itemScope */}
			{!disableMicrodata && (
				<>
					{author && <meta itemProp="author" content={author} />}
					{publisher && <meta itemProp="publisher" content={publisher} />}
					{editor && <meta itemProp="editor" content={editor} />}
					{contributor && <meta itemProp="contributor" content={contributor} />}
					{creator && <meta itemProp="creator" content={creator} />}
					{datePublished && (
						<meta itemProp="datePublished" content={datePublished} />
					)}
					{dateCreated && <meta itemProp="dateCreated" content={dateCreated} />}
					{dateModified && (
						<meta itemProp="dateModified" content={dateModified} />
					)}
					{genre && <meta itemProp="genre" content={genre} />}
					{keywords && <meta itemProp="keywords" content={keywords} />}
					{description && <meta itemProp="description" content={description} />}
					{abstract && <meta itemProp="abstract" content={abstract} />}
					{url && <meta itemProp="url" content={url} />}
					<meta itemProp="inLanguage" content={inLanguage || effectiveLocale} />
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
								itemType: `https://schema.org/${schemaType}`,
							})}
						/>
					))}
				</>
			)}

			{/* JSON-LD script nested within the component */}
			{jsonLd && (
				<script type="application/ld+json">
					{JSON.stringify(jsonLd, null, 2)}
				</script>
			)}
		</cite>
	)
}
