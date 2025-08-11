/**
 * Protagonist component
 *
 * Marks up the main character or hero of a narrative. A specialized component
 * for identifying the central character around whom the story revolves.
 * Supports hero's journey stages and character arc progression.
 *
 * Example usage:
 *
 * <Protagonist>Luke Skywalker</Protagonist>
 *
 * <Protagonist
 *   characterId="frodo"
 *   journeyStage="return"
 * >
 *   the Ring-bearer
 * </Protagonist>
 *
 * <Protagonist
 *   characterId="elizabeth-bennet"
 *   arcType="growth"
 *   multiProtagonist={true}
 * >
 *   Elizabeth
 * </Protagonist>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Type of character arc
	arcType?: "growth" | "fall" | "transformation" | "flat"
	// Character identifier
	characterId?: string
	// HTML element to use
	element?: "span" | "b" | "strong" | "em" | "mark"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// Current stage in the hero's journey
	journeyStage?: "ordinary-world" | "call" | "refusal" | "mentor" | "threshold" | "trials" | "ordeal" | "reward" | "return" | "resurrection" | "elixir"
	// Whether this is one of multiple protagonists
	multiProtagonist?: boolean
}

import { Person } from "../../../enrich/index.ts"

export default function Protagonist({
	arcType = "growth",
	characterId,
	children,
	element: Element = "span",
	enrich,
	journeyStage,
	multiProtagonist = false,
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		multiProtagonist ? "co-protagonist" : "protagonist",
		journeyStage && `at ${journeyStage.replace("-", " ")} stage`,
		arcType !== "growth" && `${arcType} arc`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class="protagonist character-role"
			data-arc-type={arcType}
			data-character-id={characterId}
			data-journey-stage={journeyStage}
			data-multi-protagonist={multiProtagonist}
			data-role="protagonist"
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
			class="protagonist character-role"
			data-arc-type={arcType}
			data-character-id={characterId}
			data-journey-stage={journeyStage}
			data-multi-protagonist={multiProtagonist}
			data-role="protagonist"
			itemProp="character"
			{...props}
		>
			{children}
		</Element>
	)
}