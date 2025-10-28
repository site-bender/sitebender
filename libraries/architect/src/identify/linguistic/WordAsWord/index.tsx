//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import type { BCP47LanguageTag } from "../../../../types/bcp47/index.ts"

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
	description: _description,
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
