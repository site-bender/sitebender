/**
 * TransliteratedTerm component
 *
 * Marks up terms that have been converted from one writing system
 * to another. Preserves the original script, indicates the system
 * used, and provides pronunciation guidance.
 *
 * Example usage:
 *
 * <TransliteratedTerm
 *   from="ru"
 *   script="Cyrillic"
 *   original="Спасибо"
 * >
 *   Spasibo
 * </TransliteratedTerm>
 *
 * <TransliteratedTerm
 *   from="ar"
 *   script="Arabic"
 *   original="شكرا"
 *   system="ALA-LC"
 *   ipa="ˈʃʊkrɑn"
 * >
 *   shukran
 * </TransliteratedTerm>
 *
 * <TransliteratedTerm
 *   from="zh-Hans"
 *   script="Simplified Chinese"
 *   original="北京"
 *   system="Pinyin"
 *   meaning="Northern Capital"
 * >
 *   Beijing
 * </TransliteratedTerm>
 */
import type { BCP47LanguageTag } from "../../../../types/bcp47/index.ts"

export type TransliterationSystem =
	| "ISO" // ISO standards
	| "ALA-LC" // American Library Association
	| "BGN/PCGN" // US/UK geographic names
	| "UNGEGN" // UN Group of Experts
	| "Pinyin" // Chinese romanization
	| "Romaji" // Japanese romanization
	| "custom" // Custom system

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	element?: "span" | "i" | "em" | "cite"
	// Source language
	from: BCP47LanguageTag
	// Link to more information
	href?: string
	// IPA pronunciation
	ipa?: string
	// Meaning/translation
	meaning?: string
	// Original text in native script
	original: string
	// Source writing system
	script?: string
	// Transliteration system used
	system?: TransliterationSystem | string
}

export default function TransliteratedTerm({
	children,
	description,
	element: Element = "i",
	from,
	href,
	ipa,
	meaning,
	original,
	script,
	system = "custom",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"transliterated from",
		script || from,
		original,
		system !== "custom" && `using ${system}`,
		meaning && `meaning ${meaning}`,
	].filter(Boolean).join(" ")

	const title = meaning || original || description

	const content = (
		<Element
			aria-label={ariaLabel}
			class={`transliterated-term transliterated-${system.toLowerCase()}`}
			data-from={from}
			data-ipa={ipa}
			data-meaning={meaning}
			data-original={original}
			data-script={script}
			data-system={system}
			lang={from}
			title={title}
			{...props}
		>
			{children}
		</Element>
	)

	if (href) {
		return (
			<a href={href} class="transliterated-term-link">
				{content}
			</a>
		)
	}

	return content
}
