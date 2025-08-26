import { Person, Quotation } from "../../../define/index.ts"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	characterId?: string
	element?: keyof HTMLElementTagNameMap | ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	children?: unknown
}
export default function Dialogue({
	children,
	element: Element = "span",
	define,
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
			{define && Element === "q" ? children : (
				Element === "q" || Element === "blockquote"
					? <q>{children}</q>
					: children
			)}
		</Element>
	)

	// Wrap with Quotation and/or Person for definement
	if (define) {
		const quotationElement = (
			<Quotation
				spokenByCharacter={speaker}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
			>
				{baseElement}
			</Quotation>
		)

		if (speakerId && speaker) {
			return (
				<Person
					id={speakerId}
					name={speaker}
					disableJsonLd={define === "microdata"}
					disableMicrodata={define === "linkedData"}
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
