/**
 * PhoneticTranscription component
 *
 * Marks up phonetic transcriptions in IPA (International Phonetic
 * Alphabet) or other phonetic notation systems. Used in linguistics,
 * dictionaries, and language learning materials.
 *
 * Example usage:
 *
 * <PhoneticTranscription notation="ipa">/fəˈnɛtɪk/</PhoneticTranscription>
 *
 * <PhoneticTranscription 
 *   notation="respelling"
 *   word="phonetic"
 * >
 *   fuh-NET-ik
 * </PhoneticTranscription>
 */

export type NotationType = 
	| "ipa"           // International Phonetic Alphabet
	| "respelling"    // Dictionary-style respelling
	| "x-sampa"       // Extended Speech Assessment Methods Phonetic Alphabet
	| "arpabet"       // CMU Pronouncing Dictionary notation
	| "pinyin"        // Chinese romanization
	| "romaji"        // Japanese romanization

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	element?: "span" | "i" | "em" | "code"
	// Link to audio or more information
	href?: string
	// Type of phonetic notation
	notation?: NotationType | string
	// The word being transcribed
	word?: string
	// Dialect or accent represented
	dialect?: string
}

export default function PhoneticTranscription({
	children,
	description,
	element: Element = "span",
	href,
	notation = "ipa",
	word,
	dialect,
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		notation === "ipa" ? "IPA transcription" : `${notation} transcription`,
		word && `for "${word}"`,
		dialect && `in ${dialect} dialect`
	].filter(Boolean).join(" ")

	const content = (
		<Element
			aria-label={ariaLabel}
			class={`phonetic-transcription phonetic-${notation}`}
			data-dialect={dialect}
			data-notation={notation}
			data-word={word}
			title={word}
			{...props}
		>
			{children}
		</Element>
	)

	if (href) {
		return (
			<a href={href} class="phonetic-link">
				{content}
			</a>
		)
	}

	return content
}