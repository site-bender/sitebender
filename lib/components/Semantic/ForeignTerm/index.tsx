import type { BCP47LanguageTag } from "../../../types/bcp47/index.ts"

import Base from "../../Base/index.tsx"

export type Props = {
	/**
	 * The foreign term or phrase content
	 */
	term: string
	/**
	 * BCP 47 language tag for the foreign term
	 */
	lang: BCP47LanguageTag
	/**
	 * Translation or explanation of the term
	 */
	translation: string
	/**
	 * Optional formatting template
	 */
	format?: string
	/**
	 * Additional data for template processing
	 */
	props?: Record<string, unknown>
	/**
	 * CSS class name
	 */
	class?: string
	/**
	 * HTML id attribute
	 */
	id?: string
	/**
	 * Optional microdata itemProp
	 */
	itemProp?: string
	/**
	 * Type of foreign term for semantic classification
	 */
	termType?: "loanword" | "technical" | "properNoun" | "phrase"
	/**
	 * No children allowed
	 */
	children?: never
}

export default function ForeignTerm({
	term,
	lang,
	translation,
	format = "{{term}}",
	props = {},
	class: className,
	id,
	itemProp,
	termType = "loanword",
}: Props) {
	// Build CSS classes immutably
	const classes = [
		"foreign-term",
		`term-type-${termType}`,
		...(className ? [className] : []),
	]

	// Prepare data for template processing
	const templateData = {
		term,
		translation,
		lang,
		termType,
		...props,
	}

	return (
		<Base<"i">
			element="i"
			format={format}
			props={templateData}
			lang={lang}
			title={translation}
			class={classes.join(" ")}
			id={id}
			itemProp={itemProp}
			data-term-type={termType}
		/>
	)
}
