/**
 * CharacterName component
 *
 * Marks up character names in narrative text. Provides semantic identification
 * of character references with support for full names, nicknames, titles, and
 * character IDs for linking multiple references to the same character.
 *
 * Example usage:
 *
 * <CharacterName>Elizabeth Bennet</CharacterName>
 *
 * <CharacterName
 *   fullName="Elizabeth Bennet"
 *   nickname="Lizzy"
 *   characterId="elizabeth-bennet"
 * >
 *   Lizzy
 * </CharacterName>
 *
 * <CharacterName
 *   fullName="Fitzwilliam Darcy"
 *   title="Mr."
 *   characterId="mr-darcy"
 *   role="romantic-lead"
 * >
 *   Mr. Darcy
 * </CharacterName>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Unique identifier for the character
	characterId?: string
	// HTML element to use
	element?: "span" | "b" | "strong" | "cite" | "mark"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// Full formal name of the character
	fullName?: string
	// Nickname or shortened form
	nickname?: string
	// Role type (protagonist, antagonist, etc.)
	role?: string
	// Title or honorific
	title?: string
}

import { Person } from "../../../enrich/index.ts"

export default function CharacterName({
	characterId,
	children,
	element: Element = "span",
	enrich,
	fullName,
	nickname,
	role,
	title,
	...props
}: Props): JSX.Element {
	const displayName = children || fullName || nickname || ""
	const ariaLabel = [
		"character",
		fullName || displayName,
		nickname && fullName && `also known as ${nickname}`,
		role && `the ${role}`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class="character-name"
			data-character-id={characterId}
			data-full-name={fullName}
			data-nickname={nickname}
			data-role={role}
			data-title={title}
			{...props}
		>
			{enrich ? <span itemProp="name">{displayName}</span> : displayName}
		</Element>
	)

	// Wrap with Person component if enriching
	if (enrich && characterId) {
		return (
			<Person
				id={characterId}
				name={fullName || displayName}
				alternateName={nickname}
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
			class="character-name"
			data-character-id={characterId}
			data-full-name={fullName}
			data-nickname={nickname}
			data-role={role}
			data-title={title}
			itemProp="character"
			{...props}
		>
			{displayName}
		</Element>
	)
}
