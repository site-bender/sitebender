/**
 * WordAsWord component
 *
 * Marks up words when they are being discussed as words rather
 * than used for their meaning. Common in linguistic discussions,
 * dictionaries, and educational content about language.
 *
 * Example usage:
 *
 * The word <WordAsWord>run</WordAsWord> can be a noun or a verb.
 *
 * <WordAsWord lang="es">Amigo</WordAsWord> means "friend" in Spanish.
 *
 * The word <WordAsWord partOfSpeech="adjective">quick</WordAsWord>
 * modifies the noun.
 */
import type { BCP47LanguageTag } from "../../../../../types/bcp47/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	element?: "span" | "i" | "em" | "cite" | "dfn"
	// Link to definition or more information
	href?: string
	// Language of the word
	lang?: BCP47LanguageTag
	// Grammatical part of speech
	partOfSpeech?:
		| "noun"
		| "verb"
		| "adjective"
		| "adverb"
		| "pronoun"
		| "preposition"
		| "conjunction"
		| "interjection"
		| "article"
	// Word form (lemma, inflected, etc.)
	form?: "lemma" | "inflected" | "compound" | "derived"
}

export default function WordAsWord({
	children,
	description,
	element: Element = "i",
	href,
	lang,
	partOfSpeech,
	form,
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"word",
		lang && `in ${lang}`,
		partOfSpeech,
	].filter(Boolean).join(" ")

	const content = (
		<Element
			aria-label={ariaLabel}
			class="word-as-word"
			data-form={form}
			data-part-of-speech={partOfSpeech}
			lang={lang}
			{...props}
		>
			{children}
		</Element>
	)

	if (href) {
		return (
			<a href={href} class="word-as-word-link">
				{content}
			</a>
		)
	}

	return content
}
