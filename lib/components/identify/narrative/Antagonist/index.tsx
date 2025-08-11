/**
 * Antagonist component
 *
 * Marks up the primary opposing force or villain in a narrative. A specialized
 * component for identifying the character or force that creates conflict for
 * the protagonist. Supports different antagonist types and motivations.
 *
 * Example usage:
 *
 * <Antagonist>Darth Vader</Antagonist>
 *
 * <Antagonist
 *   characterId="sauron"
 *   type="force"
 * >
 *   the Dark Lord
 * </Antagonist>
 *
 * <Antagonist
 *   characterId="society"
 *   type="societal"
 *   motivation="tradition"
 * >
 *   the rigid social conventions
 * </Antagonist>
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
	// Primary motivation driving the antagonist
	motivation?: "power" | "revenge" | "ideology" | "survival" | "chaos" | "tradition" | "greed"
	// Whether this antagonist is redeemable
	redeemable?: boolean
	// Type of antagonistic force
	type?: "character" | "self" | "nature" | "society" | "technology" | "fate" | "force"
}

import { Person } from "../../../enrich/index.ts"

export default function Antagonist({
	characterId,
	children,
	element: Element = "span",
	enrich,
	motivation,
	redeemable = false,
	type = "character",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"antagonist",
		type !== "character" && `${type} antagonist`,
		motivation && `motivated by ${motivation}`,
		redeemable && "redeemable",
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class="antagonist character-role"
			data-character-id={characterId}
			data-motivation={motivation}
			data-redeemable={redeemable}
			data-role="antagonist"
			data-type={type}
			{...props}
		>
			{enrich && type === "character" ? (
				<span itemProp="name">{children}</span>
			) : (
				children
			)}
		</Element>
	)

	// Wrap with Person component if enriching and it's a character
	if (enrich && characterId && type === "character") {
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
			class="antagonist character-role"
			data-character-id={characterId}
			data-motivation={motivation}
			data-redeemable={redeemable}
			data-role="antagonist"
			data-type={type}
			itemProp="character"
			{...props}
		>
			{children}
		</Element>
	)
}