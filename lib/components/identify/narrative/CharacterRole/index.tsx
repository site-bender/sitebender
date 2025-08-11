/**
 * CharacterRole component
 *
 * Marks up character roles and archetypes in narrative text. Provides semantic
 * identification of narrative functions, archetypal patterns, and story roles
 * that characters fulfill.
 *
 * Example usage:
 *
 * <CharacterRole
 *   characterId="gandalf"
 *   archetype="mentor"
 * >
 *   the wise guide
 * </CharacterRole>
 *
 * <CharacterRole
 *   characterId="darth-vader"
 *   archetype="shadow"
 *   function="antagonist"
 * >
 *   the dark father figure
 * </CharacterRole>
 *
 * <CharacterRole
 *   characterId="samwise"
 *   archetype="companion"
 *   function="support"
 *   importance="major"
 * >
 *   the loyal friend
 * </CharacterRole>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Jungian or Campbell archetype
	archetype?: "hero" | "mentor" | "threshold-guardian" | "herald" | "shapeshifter" | "shadow" | "trickster" | "companion"
	// Character this role applies to
	characterId?: string
	// HTML element to use
	element?: "span" | "b" | "strong" | "em" | "mark"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// Narrative function
	function?: "protagonist" | "antagonist" | "deuteragonist" | "tritagonist" | "support" | "foil" | "catalyst"
	// Importance level in the narrative
	importance?: "major" | "minor" | "cameo"
}

import { Person } from "../../../enrich/index.ts"

export default function CharacterRole({
	archetype,
	characterId,
	children,
	element: Element = "span",
	enrich,
	function: narrativeFunction,
	importance = "major",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"character role",
		narrativeFunction,
		archetype && `${archetype} archetype`,
		importance !== "major" && `${importance} character`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`character-role role-${narrativeFunction || "unspecified"}`}
			data-archetype={archetype}
			data-character-id={characterId}
			data-function={narrativeFunction}
			data-importance={importance}
			{...props}
		>
			{children}
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
			class={`character-role role-${narrativeFunction || "unspecified"}`}
			data-archetype={archetype}
			data-character-id={characterId}
			data-function={narrativeFunction}
			data-importance={importance}
			itemProp="character"
			{...props}
		>
			{children}
		</Element>
	)
}