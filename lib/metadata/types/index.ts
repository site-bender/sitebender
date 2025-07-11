// Import BCP-47 language types
import type { BCP47LanguageTag } from "./bcp47/index.ts"

// Schema.org enum types
export type AccessMode = "auditory" | "tactile" | "textual" | "visual"
export type AccessibilityAPI =
	| "AndroidAccessibility"
	| "ARIA"
	| "ATK"
	| "AT-SPI"
	| "BlackberryAccessibility"
	| "iAccessible2"
	| "iOSAccessibility"
	| "JavaAccessibility"
	| "MacOSXAccessibility"
	| "MSAA"
	| "UIAutomation"
export type AccessibilityControl =
	| "fullKeyboardControl"
	| "fullMouseControl"
	| "fullSwitchControl"
	| "fullTouchControl"
	| "fullVideoControl"
	| "fullVoiceControl"
export type AccessibilityFeature =
	| "alternativeText"
	| "annotations"
	| "audioDescription"
	| "autoplay"
	| "bookmarks"
	| "braille"
	| "captions"
	| "ChemML"
	| "describedMath"
	| "displayTransformability"
	| "displayTransformability"
	| "enhancedTypography"
	| "highContrastAudio"
	| "highContrastDisplay"
	| "index"
	| "largePrint"
	| "latex"
	| "longDescription"
	| "MathML"
	| "none"
	| "printPageNumbers"
	| "readingOrder"
	| "rubyAnnotations"
	| "signLanguage"
	| "structuralNavigation"
	| "synchronizedAudioText"
	| "tableOfContents"
	| "taggedPDF"
	| "tactileGraphic"
	| "tactileObject"
	| "timingControl"
	| "transcript"
	| "ttsMarkup"
	| "unlocked"
export type AccessibilityHazard =
	| "flashing"
	| "noFlashingHazard"
	| "motionSimulation"
	| "noMotionSimulationHazard"
	| "sound"
	| "noSoundHazard"
	| "unknown"
export type CreativeWorkStatus = "Draft" | "Failed" | "Incomplete" | "Published"
export type BookFormat =
	| "AudiobookFormat"
	| "EBook"
	| "GraphicNovel"
	| "Hardcover"
	| "Paperback"

// Translation quality indicators
export type TranslationQuality =
	| "official" // Publisher-verified translations
	| "academic" // Scholarly editions
	| "community" // Fan-contributed translations
	| "machine" // Automated translations
	| "historical" // Different eras

// Translation metadata for a specific language
export type TranslationData = {
	// Core translation content
	title?: string
	author?: string | PersonName
	description?: string

	// Translation metadata
	translator?: string | PersonName
	quality?: TranslationQuality
	publishedYear?: string
	datePublished?: string

	// Additional metadata
	publisherImprint?: string
	isbn?: string
	edition?: string
	notes?: string

	// Schema.org compliance
	inLanguage?: BCP47LanguageTag
}

// Translation collection - maps language codes to translation data
export type TranslationCollection = {
	[K in BCP47LanguageTag]?: TranslationData
}

// Thing properties (base schema.org type)
export type ThingProps = {
	additionalType?: string
	alternateName?: string
	description?: string
	disambiguatingDescription?: string
	identifier?: string
	image?: string
	mainEntityOfPage?: string
	potentialAction?: string
	sameAs?: string[]
	subjectOf?: string
	url?: string
}

// CreativeWork properties (extends Thing)
export type CreativeWorkProps = ThingProps & {
	about?: string
	abstract?: string
	accessMode?: AccessMode | AccessMode[]
	accessModeSufficient?: string
	accessibilityAPI?: AccessibilityAPI | AccessibilityAPI[]
	accessibilityControl?: AccessibilityControl | AccessibilityControl[]
	accessibilityFeature?: AccessibilityFeature | AccessibilityFeature[]
	accessibilityHazard?: AccessibilityHazard | AccessibilityHazard[]
	accessibilitySummary?: string
	accountablePerson?: string
	acquireLicensePage?: string
	aggregateRating?: string
	alternativeHeadline?: string
	associatedMedia?: string
	audience?: string
	audio?: string
	author?: string
	award?: string
	character?: string
	citation?: string
	comment?: string
	commentCount?: number
	conditionsOfAccess?: string
	contentLocation?: string
	contentRating?: string
	contentReferenceTime?: string
	contributor?: string
	copyrightHolder?: string
	copyrightNotice?: string
	copyrightYear?: number
	correction?: string
	countryOfOrigin?: string
	creativeWorkStatus?: CreativeWorkStatus
	creator?: string
	creditText?: string
	dateCreated?: string
	dateModified?: string
	datePublished?: string
	discussionUrl?: string
	editEIDR?: string
	editor?: string
	educationalAlignment?: string
	educationalLevel?: string
	educationalUse?: string
	encoding?: string
	encodingFormat?: string
	exampleOfWork?: string
	expires?: string
	funder?: string
	funding?: string
	genre?: string
	hasPart?: string
	headline?: string
	inLanguage?: string
	interactionStatistic?: string
	interactivityType?: string
	interpretedAsClaim?: string
	isAccessibleForFree?: boolean
	isBasedOn?: string
	isFamilyFriendly?: boolean
	isPartOf?: string
	keywords?: string
	learningResourceType?: string
	license?: string
	locationCreated?: string
	mainEntity?: string
	maintainer?: string
	material?: string
	materialExtent?: string
	mentions?: string
	offers?: string
	pattern?: string
	position?: string
	producer?: string
	provider?: string
	publication?: string
	publisher?: string
	publisherImprint?: string
	publishingPrinciples?: string
	recordedAt?: string
	releasedEvent?: string
	review?: string
	schemaVersion?: string
	sdDatePublished?: string
	sdLicense?: string
	sdPublisher?: string
	size?: string
	sourceOrganization?: string
	spatial?: string
	spatialCoverage?: string
	sponsor?: string
	temporal?: string
	temporalCoverage?: string
	text?: string
	thumbnailUrl?: string
	timeRequired?: string
	translationOfWork?: string
	translator?: string
	typicalAgeRange?: string
	usageInfo?: string
	version?: string
	video?: string
	workExample?: string
	workTranslation?: string
}

// Book-specific properties (extends CreativeWork)
export type BookProps = CreativeWorkProps & {
	abridged?: boolean
	bookEdition?: string
	bookFormat?: BookFormat
	isbn?: string
	numberOfPages?: number | string
	// Enhanced author support with structured names
	author?: string | PersonName
	editor?: string | PersonName
	translator?: string | PersonName

	// Translation support
	locale?: BCP47LanguageTag // Primary language/locale of the content
	translations?: TranslationCollection // Translation data for multiple languages
}

// JSON value types (for actual JSON data)
export type JsonPrimitive = string | number | boolean | null
export type JsonValue = JsonPrimitive | JsonArray | JsonObject
export type JsonArray = JsonValue[]
export type JsonObject = { [key: string]: JsonValue }

// JavaScript value types (for runtime JS objects)
export type JsPrimitive = string | number | boolean | null | undefined
export type JsValue = JsPrimitive | JsArray | JsObject
export type JsArray = JsValue[]
export type JsObject = { [key: string]: JsValue }

export type PersonName = {
	givenName?: string // First name(s)
	familyName?: string // Last name
	additionalName?: string // Middle name(s)
	// For backward compatibility, keep full name option
	fullName?: string // Complete name as single string
}
