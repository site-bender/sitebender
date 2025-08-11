/**
 * Dialogue component
 *
 * Marks up spoken dialogue in narrative text. Provides semantic identification
 * of spoken words, speaker attribution, and conversational context. Supports
 * both inline and block-level dialogue markup.
 *
 * Example usage:
 *
 * <Dialogue>"Hello," she said.</Dialogue>
 *
 * <Dialogue
 *   speaker="Elizabeth Bennet"
 *   speakerId="elizabeth"
 * >
 *   "I am perfectly convinced that Mr. Darcy has no defect."
 * </Dialogue>
 *
 * <Dialogue
 *   speaker="Mr. Darcy"
 *   speakerId="darcy"
 *   tone="serious"
 *   element="blockquote"
 *   enrich="microdata"
 * >
 *   "My good opinion once lost is lost forever."
 * </Dialogue>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// HTML element to use
	element?: "span" | "div" | "q" | "blockquote"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// Whether this is internal (thought) vs external (spoken)
	internal?: boolean
	// Language of the dialogue if different from document
	lang?: string
	// Name of the speaker
	speaker?: string
	// Unique identifier for the speaker
	speakerId?: string
	// Emotional tone or manner of speaking
	tone?: "angry" | "happy" | "sad" | "sarcastic" | "whispered" | "shouted" | "serious" | "playful"
}

import { Person, Quotation } from "../../../enrich/index.ts"

export default function Dialogue({
	children,
	element: Element = "span",
	enrich,
	internal = false,
	lang,
	speaker,
	speakerId,
	tone,
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		internal ? "internal dialogue" : "dialogue",
		speaker && `spoken by ${speaker}`,
		tone && `in ${tone} tone`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`dialogue ${internal ? "internal-dialogue" : "spoken-dialogue"}`}
			data-internal={internal}
			data-speaker={speaker}
			data-speaker-id={speakerId}
			data-tone={tone}
			lang={lang}
			{...props}
		>
			{enrich && Element === "q" ? children : (
				Element === "q" || Element === "blockquote" ? (
					<q>{children}</q>
				) : (
					children
				)
			)}
		</Element>
	)

	// Wrap with Quotation and/or Person for enrichment
	if (enrich) {
		const quotationElement = (
			<Quotation
				spokenByCharacter={speaker}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</Quotation>
		)

		if (speakerId && speaker) {
			return (
				<Person
					id={speakerId}
					name={speaker}
					disableJsonLd={enrich === "microdata"}
					disableMicrodata={enrich === "linkedData"}
				>
					{quotationElement}
				</Person>
			)
		}

		return quotationElement
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`dialogue ${internal ? "internal-dialogue" : "spoken-dialogue"}`}
			data-internal={internal}
			data-speaker={speaker}
			data-speaker-id={speakerId}
			data-tone={tone}
			itemProp="spokenByCharacter"
			lang={lang}
			{...props}
		>
			{Element === "q" || Element === "blockquote" ? (
				<q itemProp="text">{children}</q>
			) : (
				children
			)}
		</Element>
	)
}