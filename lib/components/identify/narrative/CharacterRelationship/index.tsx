/**
 * CharacterRelationship component
 *
 * Marks up relationships between characters in narrative text. Provides semantic
 * identification of familial, romantic, professional, and social relationships
 * with support for bidirectional relationship types.
 *
 * Example usage:
 *
 * <CharacterRelationship
 *   from="elizabeth-bennet"
 *   to="jane-bennet"
 *   type="sibling"
 * >
 *   her sister Jane
 * </CharacterRelationship>
 *
 * <CharacterRelationship
 *   from="mr-darcy"
 *   to="elizabeth-bennet"
 *   type="romantic"
 *   status="eventual"
 * >
 *   his future wife
 * </CharacterRelationship>
 *
 * <CharacterRelationship
 *   from="romeo"
 *   to="juliet"
 *   type="romantic"
 *   reciprocal={true}
 * >
 *   star-crossed lovers
 * </CharacterRelationship>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// HTML element to use
	element?: "span" | "b" | "strong" | "em" | "mark"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// Character ID this relationship is from
	from?: string
	// Whether the relationship is mutual/bidirectional
	reciprocal?: boolean
	// Current status of the relationship
	status?: "current" | "former" | "eventual" | "potential"
	// Character ID this relationship is to
	to?: string
	// Type of relationship
	type?: "familial" | "romantic" | "friendship" | "professional" | "adversarial" | "sibling" | "parent" | "child" | "spouse" | "mentor" | "rival"
}

import { Person } from "../../../enrich/index.ts"

export default function CharacterRelationship({
	children,
	element: Element = "span",
	enrich,
	from,
	reciprocal = false,
	status = "current",
	to,
	type = "friendship",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"relationship",
		type,
		reciprocal && "mutual",
		status !== "current" && status,
		from && to && `between ${from} and ${to}`,
	].filter(Boolean).join(" ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`character-relationship relationship-${type}`}
			data-from={from}
			data-reciprocal={reciprocal}
			data-status={status}
			data-to={to}
			data-type={type}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with Person component if enriching
	if (enrich && to) {
		return (
			<Person
				id={to}
				name={children}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
				itemProp="knows"
			>
				{baseElement}
			</Person>
		)
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`character-relationship relationship-${type}`}
			data-from={from}
			data-reciprocal={reciprocal}
			data-status={status}
			data-to={to}
			data-type={type}
			itemProp="knows"
			{...props}
		>
			{children}
		</Element>
	)
}