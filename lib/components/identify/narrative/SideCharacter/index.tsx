/**
 * SideCharacter component
 *
 * Marks up supporting or minor characters in a narrative. These are characters
 * who play important roles in the story but are neither protagonists nor
 * antagonists. Includes comic relief, confidants, love interests, and other
 * supporting roles.
 *
 * Example usage:
 *
 * <SideCharacter>Ron Weasley</SideCharacter>
 *
 * <SideCharacter
 *   characterId="samwise"
 *   function="loyal-companion"
 * >
 *   Sam
 * </SideCharacter>
 *
 * <SideCharacter
 *   characterId="mercutio"
 *   function="comic-relief"
 *   fate="tragic"
 * >
 *   the witty Mercutio
 * </SideCharacter>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Character identifier
	characterId?: string
	// HTML element to use
	element?: "span" | "b" | "strong" | "em" | "mark"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// Ultimate fate of the character in the story
	fate?: "survives" | "dies" | "transformed" | "unknown"
	// Specific function this side character serves
	function?: "mentor" | "love-interest" | "comic-relief" | "confidant" | "foil" | "catalyst" | "loyal-companion" | "voice-of-reason"
	// How often the character appears
	presence?: "recurring" | "occasional" | "single-scene"
}

import { Person } from "../../../enrich/index.ts"

export default function SideCharacter({
	characterId,
	children,
	element: Element = "span",
	enrich,
	fate,
	function: characterFunction,
	presence = "recurring",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"side character",
		characterFunction && characterFunction.replace("-", " "),
		presence !== "recurring" && `${presence} appearance`,
		fate && `${fate} by story's end`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class="side-character character-role"
			data-character-id={characterId}
			data-fate={fate}
			data-function={characterFunction}
			data-presence={presence}
			data-role="side-character"
			{...props}
		>
			{enrich ? <span itemProp="name">{children}</span> : children}
		</Element>
	)

	// Wrap with Person component if enriching
	if (enrich && characterId) {
		return (
			<Person
				id={characterId}
				name={children}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</Person>
		)
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class="side-character character-role"
			data-character-id={characterId}
			data-fate={fate}
			data-function={characterFunction}
			data-presence={presence}
			data-role="side-character"
			itemProp="character"
			{...props}
		>
			{children}
		</Element>
	)
}