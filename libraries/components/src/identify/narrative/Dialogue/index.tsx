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
				Element === "q" || Element === "blockquote"
					? <q>{children}</q>
					: children
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
			{Element === "q" || Element === "blockquote"
				? <q itemProp="text">{children}</q>
				: children}
		</Element>
	)
}
