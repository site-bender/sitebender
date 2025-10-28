// BCP-47 Language Codes Union Type
// Based on src/pagewright/metadata/BCP-47.md

// Base language codes (without region/script)
export type BaseLanguageCode =
	| "af" // Afrikaans
	| "sq" // Albanian
	| "am" // Amharic
	| "ar" // Arabic
	| "hy" // Armenian
	| "az" // Azerbaijani
	| "eu" // Basque
	| "be" // Belarusian
	| "bn" // Bengali
	| "bs" // Bosnian
	| "bg" // Bulgarian
	| "my" // Burmese
	| "ca" // Catalan
	| "zh" // Chinese
	| "hr" // Croatian
	| "cs" // Czech
	| "da" // Danish
	| "nl" // Dutch
	| "en" // English
	| "et" // Estonian
	| "fi" // Finnish
	| "fr" // French
	| "gl" // Galician
	| "ka" // Georgian
	| "de" // German
	| "el" // Greek
	| "gu" // Gujarati
	| "he" // Hebrew
	| "hi" // Hindi
	| "hu" // Hungarian
	| "is" // Icelandic
	| "id" // Indonesian
	| "ga" // Irish
	| "it" // Italian
	| "ja" // Japanese
	| "kn" // Kannada
	| "kk" // Kazakh
	| "km" // Khmer
	| "ko" // Korean
	| "ku" // Kurdish
	| "ky" // Kyrgyz
	| "lo" // Lao
	| "la" // Latin
	| "lv" // Latvian
	| "lt" // Lithuanian
	| "mk" // Macedonian
	| "ms" // Malay
	| "ml" // Malayalam
	| "mt" // Maltese
	| "mr" // Marathi
	| "mn" // Mongolian
	| "ne" // Nepali
	| "no" // Norwegian
	| "nb" // Norwegian Bokmål
	| "nn" // Norwegian Nynorsk
	| "ps" // Pashto
	| "fa" // Persian/Farsi
	| "pl" // Polish
	| "pt" // Portuguese
	| "pa" // Punjabi
	| "ro" // Romanian
	| "ru" // Russian
	| "sr" // Serbian
	| "si" // Sinhala
	| "sk" // Slovak
	| "sl" // Slovenian
	| "es" // Spanish
	| "sw" // Swahili
	| "sv" // Swedish
	| "ta" // Tamil
	| "te" // Telugu
	| "th" // Thai
	| "tr" // Turkish
	| "uk" // Ukrainian
	| "ur" // Urdu
	| "uz" // Uzbek
	| "vi" // Vietnamese
	| "cy" // Welsh
	| "yi" // Yiddish

// Regional variants for English
export type EnglishVariant =
	| "en-US" // United States
	| "en-GB" // United Kingdom
	| "en-CA" // Canada
	| "en-AU" // Australia
	| "en-NZ" // New Zealand
	| "en-ZA" // South Africa
	| "en-IN" // India

// Regional variants for Spanish
export type SpanishVariant =
	| "es-ES" // Spain
	| "es-MX" // Mexico
	| "es-AR" // Argentina
	| "es-CO" // Colombia
	| "es-CL" // Chile
	| "es-PE" // Peru
	| "es-VE" // Venezuela

// Regional variants for French
export type FrenchVariant =
	| "fr-FR" // France
	| "fr-CA" // Canada
	| "fr-BE" // Belgium
	| "fr-CH" // Switzerland

// Regional variants for German
export type GermanVariant =
	| "de-DE" // Germany
	| "de-AT" // Austria
	| "de-CH" // Switzerland

// Regional variants for Portuguese
export type PortugueseVariant =
	| "pt-BR" // Brazil
	| "pt-PT" // Portugal

// Regional variants for Arabic
export type ArabicVariant =
	| "ar-SA" // Saudi Arabia
	| "ar-EG" // Egypt
	| "ar-AE" // United Arab Emirates
	| "ar-MA" // Morocco
	| "ar-LB" // Lebanon

// Chinese script and regional variants
export type ChineseVariant =
	| "zh-Hans" // Simplified script
	| "zh-Hant" // Traditional script
	| "zh-CN" // China
	| "zh-TW" // Taiwan
	| "zh-HK" // Hong Kong
	| "zh-SG" // Singapore

// Script variants for Serbian
export type SerbianVariant =
	| "sr-Cyrl" // Cyrillic
	| "sr-Latn" // Latin

// Script variants for Uzbek
export type UzbekVariant =
	| "uz-Cyrl" // Cyrillic
	| "uz-Latn" // Latin

// Script variants for Mongolian
export type MongolianVariant =
	| "mn-Cyrl" // Cyrillic
	| "mn-Mong" // Traditional

// Comprehensive BCP-47 language tag union
export type BCP47LanguageTag =
	| BaseLanguageCode
	| EnglishVariant
	| SpanishVariant
	| FrenchVariant
	| GermanVariant
	| PortugueseVariant
	| ArabicVariant
	| ChineseVariant
	| SerbianVariant
	| UzbekVariant
	| MongolianVariant

export type Language = BCP47LanguageTag

// Type guards for language detection
export function isValidBCP47(lang: string): lang is BCP47LanguageTag {
	return [
		// Base languages
		"af",
		"sq",
		"am",
		"ar",
		"hy",
		"az",
		"eu",
		"be",
		"bn",
		"bs",
		"bg",
		"my",
		"ca",
		"zh",
		"hr",
		"cs",
		"da",
		"nl",
		"en",
		"et",
		"fi",
		"fr",
		"gl",
		"ka",
		"de",
		"el",
		"gu",
		"he",
		"hi",
		"hu",
		"is",
		"id",
		"ga",
		"it",
		"ja",
		"kn",
		"kk",
		"km",
		"ko",
		"ku",
		"ky",
		"lo",
		"la",
		"lv",
		"lt",
		"mk",
		"ms",
		"ml",
		"mt",
		"mr",
		"mn",
		"ne",
		"no",
		"nb",
		"nn",
		"ps",
		"fa",
		"pl",
		"pt",
		"pa",
		"ro",
		"ru",
		"sr",
		"si",
		"sk",
		"sl",
		"es",
		"sw",
		"sv",
		"ta",
		"te",
		"th",
		"tr",
		"uk",
		"ur",
		"uz",
		"vi",
		"cy",
		"yi",

		// Regional variants
		"en-US",
		"en-GB",
		"en-CA",
		"en-AU",
		"en-NZ",
		"en-ZA",
		"en-IN",
		"es-ES",
		"es-MX",
		"es-AR",
		"es-CO",
		"es-CL",
		"es-PE",
		"es-VE",
		"fr-FR",
		"fr-CA",
		"fr-BE",
		"fr-CH",
		"de-DE",
		"de-AT",
		"de-CH",
		"pt-BR",
		"pt-PT",
		"ar-SA",
		"ar-EG",
		"ar-AE",
		"ar-MA",
		"ar-LB",
		"zh-Hans",
		"zh-Hant",
		"zh-CN",
		"zh-TW",
		"zh-HK",
		"zh-SG",
		"sr-Cyrl",
		"sr-Latn",
		"uz-Cyrl",
		"uz-Latn",
		"mn-Cyrl",
		"mn-Mong",
	].includes(lang)
}

// Language family groupings for fallback detection
export const LANGUAGE_FAMILIES = {
	english: [
		"en",
		"en-US",
		"en-GB",
		"en-CA",
		"en-AU",
		"en-NZ",
		"en-ZA",
		"en-IN",
	] as const,
	spanish: [
		"es",
		"es-ES",
		"es-MX",
		"es-AR",
		"es-CO",
		"es-CL",
		"es-PE",
		"es-VE",
	] as const,
	french: ["fr", "fr-FR", "fr-CA", "fr-BE", "fr-CH"] as const,
	german: ["de", "de-DE", "de-AT", "de-CH"] as const,
	portuguese: ["pt", "pt-BR", "pt-PT"] as const,
	arabic: ["ar", "ar-SA", "ar-EG", "ar-AE", "ar-MA", "ar-LB"] as const,
	chinese: [
		"zh",
		"zh-Hans",
		"zh-Hant",
		"zh-CN",
		"zh-TW",
		"zh-HK",
		"zh-SG",
	] as const,
	serbian: ["sr", "sr-Cyrl", "sr-Latn"] as const,
	uzbek: ["uz", "uz-Cyrl", "uz-Latn"] as const,
	mongolian: ["mn", "mn-Cyrl", "mn-Mong"] as const,
} as const

export type LanguageFamily = keyof typeof LANGUAGE_FAMILIES
