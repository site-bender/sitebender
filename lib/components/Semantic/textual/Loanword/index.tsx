/**
 * Loanword component
 *
 * Marks up words borrowed from other languages that have been
 * integrated into the current language. Tracks the source language,
 * adaptation status, and historical context of borrowing.
 *
 * Example usage:
 *
 * <Loanword from="fr" adapted>
 *   café
 * </Loanword>
 *
 * <Loanword 
 *   from="ja"
 *   period="1990s"
 *   originalForm="絵文字"
 * >
 *   emoji
 * </Loanword>
 *
 * <Loanword
 *   from="it"
 *   via={["fr"]}
 *   adapted
 *   meaning="final section of music"
 * >
 *   finale
 * </Loanword>
 */
import type { BCP47LanguageTag } from "../../../../types/bcp47/index.ts"

export type Props = {
	// Whether the word has been adapted to local spelling/pronunciation
	adapted?: boolean
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	element?: "i" | "span" | "em" | "cite"
	// Source language
	from: BCP47LanguageTag
	// Link to etymology or definition
	href?: string
	// Meaning in source language
	meaning?: string
	// Original form in source language
	originalForm?: string
	// Period when borrowed
	period?: string
	// Semantic field
	semanticField?: string
	// Intermediate languages
	via?: BCP47LanguageTag[]
}

export default function Loanword({
	adapted = false,
	children,
	description,
	element: Element = "i",
	from,
	href,
	meaning,
	originalForm,
	period,
	semanticField,
	via,
	...props
}: Props): JSX.Element {
	const borrowingPath = [
		`from ${from}`,
		via && via.length > 0 && `via ${via.join(", ")}`
	].filter(Boolean).join(" ")

	const ariaLabel = [
		"loanword",
		borrowingPath,
		period && `borrowed in ${period}`,
		adapted && "adapted"
	].filter(Boolean).join(", ")

	const title = meaning || originalForm || description

	const content = (
		<Element
			aria-label={ariaLabel}
			class={`loanword${adapted ? " loanword-adapted" : ""}`}
			data-adapted={adapted}
			data-from={from}
			data-meaning={meaning}
			data-original-form={originalForm}
			data-period={period}
			data-semantic-field={semanticField}
			data-via={via?.join(",")}
			title={title}
			{...props}
		>
			{children}
		</Element>
	)

	if (href) {
		return (
			<a href={href} class="loanword-link">
				{content}
			</a>
		)
	}

	return content
}