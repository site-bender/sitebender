/**
 * InternalMonologue component
 *
 * Marks up a character's internal thoughts, self-dialogue, or stream of
 * consciousness. Represents unspoken thoughts as opposed to spoken dialogue.
 * Supports both inline thoughts and extended internal reflections.
 *
 * Example usage:
 *
 * <InternalMonologue>
 *   What was I thinking?
 * </InternalMonologue>
 *
 * <InternalMonologue
 *   characterId="elizabeth"
 *   character="Elizabeth Bennet"
 * >
 *   How could I have been so blind to his true nature?
 * </InternalMonologue>
 *
 * <InternalMonologue
 *   characterId="hamlet"
 *   character="Hamlet"
 *   element="div"
 *   style="stream-of-consciousness"
 *   enrich="both"
 * >
 *   To be or not to be, that is the question...
 * </InternalMonologue>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Name of the thinking character
	character?: string
	// Unique identifier for the character
	characterId?: string
	// HTML element to use
	element?: "span" | "div" | "aside" | "blockquote"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// Emotional state during the thought
	mood?: "anxious" | "contemplative" | "confused" | "determined" | "regretful" | "hopeful"
	// Style of internal monologue
	style?: "stream-of-consciousness" | "reflective" | "questioning" | "decisive"
}

import { CreativeWork, Person } from "../../../enrich/index.ts"

export default function InternalMonologue({
	character,
	characterId,
	children,
	element: Element = "span",
	enrich,
	mood,
	style = "reflective",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"internal monologue",
		character && `by ${character}`,
		style !== "reflective" && style.replace("-", " "),
		mood && `${mood} mood`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`internal-monologue monologue-${style}`}
			data-character={character}
			data-character-id={characterId}
			data-mood={mood}
			data-style={style}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with CreativeWork and/or Person for enrichment
	if (enrich) {
		const workElement = (
			<CreativeWork
				text={children}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</CreativeWork>
		)

		if (characterId && character) {
			return (
				<Person
					id={characterId}
					name={character}
					disableJsonLd={enrich === "microdata"}
					disableMicrodata={enrich === "linkedData"}
				>
					{workElement}
				</Person>
			)
		}

		return workElement
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`internal-monologue monologue-${style}`}
			data-character={character}
			data-character-id={characterId}
			data-mood={mood}
			data-style={style}
			itemProp="text"
			{...props}
		>
			{children}
		</Element>
	)
}
