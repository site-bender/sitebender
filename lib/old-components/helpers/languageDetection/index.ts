import type { BCP47LanguageTag } from "../../types/bcp47/index.ts"
import type { TranslationCollection } from "../../types/index.ts"

import { isValidBCP47, LANGUAGE_FAMILIES } from "../../types/bcp47/index.ts"

// Language detection interface
export interface LanguageDetection {
	primary: BCP47LanguageTag // Primary language of the content
	browser: BCP47LanguageTag // Browser language preference
	userPreference?: BCP47LanguageTag // User override preference
	fallbacks: BCP47LanguageTag[] // Calculated fallback chain
}

// Extract base language from a BCP-47 tag (e.g., "en-US" -> "en")
export function getBaseLanguage(lang: BCP47LanguageTag): string {
	return lang.split("-")[0]
}

// Get language family for a given language
export function getLanguageFamily(lang: BCP47LanguageTag): string | null {
	const baseLanguage = getBaseLanguage(lang)

	for (const [family, languages] of Object.entries(LANGUAGE_FAMILIES)) {
		if (
			(languages as readonly string[]).some((l: string) =>
				l === lang || l === baseLanguage
			)
		) {
			return family
		}
	}

	return null
}

// Get fallback languages for a given language
export function getFallbackLanguages(
	lang: BCP47LanguageTag,
): BCP47LanguageTag[] {
	const fallbacks: BCP47LanguageTag[] = []
	const baseLanguage = getBaseLanguage(lang)

	// Add base language if different from current
	if (baseLanguage !== lang && isValidBCP47(baseLanguage)) {
		fallbacks.push(baseLanguage as BCP47LanguageTag)
	}

	// Add language family variants
	const family = getLanguageFamily(lang)
	if (family) {
		const familyLanguages =
			LANGUAGE_FAMILIES[family as keyof typeof LANGUAGE_FAMILIES]
		for (const familyLang of familyLanguages) {
			if (familyLang !== lang && !fallbacks.includes(familyLang)) {
				fallbacks.push(familyLang)
			}
		}
	}

	return fallbacks
}

// Detect user's preferred language from browser
export function detectBrowserLanguage(): BCP47LanguageTag {
	// Default fallback
	const defaultLang: BCP47LanguageTag = "en-US"

	// In browser environment
	if (typeof navigator !== "undefined") {
		const browserLang = navigator.language || (navigator as any).userLanguage
		if (browserLang && isValidBCP47(browserLang)) {
			return browserLang as BCP47LanguageTag
		}

		// Try base language
		const baseLang = browserLang?.split("-")[0]
		if (baseLang && isValidBCP47(baseLang)) {
			return baseLang as BCP47LanguageTag
		}
	}

	// In server environment, could read from Accept-Language header
	// For now, return default
	return defaultLang
}

// Create language detection object
export function createLanguageDetection(
	primaryLanguage: BCP47LanguageTag,
	userPreference?: BCP47LanguageTag,
): LanguageDetection {
	const browser = detectBrowserLanguage()
	const fallbacks = getFallbackLanguages(browser)

	return {
		primary: primaryLanguage,
		browser,
		userPreference,
		fallbacks,
	}
}

// Translation matching algorithm
export function findBestTranslation(
	translations: TranslationCollection,
	detection: LanguageDetection,
): { language: BCP47LanguageTag; data: any } | null {
	// 1. User preference override
	if (detection.userPreference && translations[detection.userPreference]) {
		return {
			language: detection.userPreference,
			data: translations[detection.userPreference],
		}
	}

	// 2. Exact browser language match
	if (translations[detection.browser]) {
		return {
			language: detection.browser,
			data: translations[detection.browser],
		}
	}

	// 3. Language fallback chain
	for (const fallback of detection.fallbacks) {
		if (translations[fallback]) {
			return {
				language: fallback,
				data: translations[fallback],
			}
		}
	}

	// 4. Any available translation (pick first)
	const availableLanguages = Object.keys(translations) as BCP47LanguageTag[]
	if (availableLanguages.length > 0) {
		const firstLang = availableLanguages[0]
		return {
			language: firstLang,
			data: translations[firstLang],
		}
	}

	// 5. No translation found
	return null
}

// Simple language detection for component usage
export function detectLanguageForTranslations(
	primaryLanguage: BCP47LanguageTag,
	translations?: TranslationCollection,
	userPreference?: BCP47LanguageTag,
): {
	detection: LanguageDetection
	bestTranslation: { language: BCP47LanguageTag; data: any } | null
} {
	const detection = createLanguageDetection(primaryLanguage, userPreference)
	const bestTranslation = translations
		? findBestTranslation(translations, detection)
		: null

	return {
		detection,
		bestTranslation,
	}
}
