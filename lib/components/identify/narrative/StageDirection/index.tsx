/**
 * StageDirection component
 *
 * Marks up stage directions, actions, and production notes in plays, scripts,
 * or dramatic narratives. Provides semantic identification of non-dialogue
 * dramatic instructions including entrances, exits, actions, and scene notes.
 *
 * Example usage:
 *
 * <StageDirection>Enter stage left</StageDirection>
 *
 * <StageDirection
 *   type="entrance"
 *   characterId="hamlet"
 * >
 *   HAMLET enters, reading a book
 * </StageDirection>
 *
 * <StageDirection
 *   type="action"
 *   characterId="juliet"
 *   element="div"
 *   enrich="microdata"
 * >
 *   She drinks the potion and falls upon her bed
 * </StageDirection>
 *
 * <StageDirection
 *   type="technical"
 *   category="lighting"
 * >
 *   Lights dim to blackout
 * </StageDirection>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Technical category for production directions
	category?: "lighting" | "sound" | "props" | "costume" | "set"
	// Character this direction applies to
	characterId?: string
	// HTML element to use
	element?: "span" | "div" | "aside" | "i" | "em"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// Placement in the script
	placement?: "inline" | "margin" | "centered" | "parenthetical"
	// Type of stage direction
	type?: "entrance" | "exit" | "action" | "pause" | "aside" | "technical" | "setting"
}

import { CreativeWork } from "../../../enrich/index.ts"

export default function StageDirection({
	category,
	characterId,
	children,
	element: Element = "span",
	enrich,
	placement = "inline",
	type = "action",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"stage direction",
		type !== "action" && type,
		category && `${category} direction`,
		characterId && `for character ${characterId}`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`stage-direction direction-${type} placement-${placement}`}
			data-category={category}
			data-character-id={characterId}
			data-placement={placement}
			data-type={type}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with CreativeWork for enrichment
	if (enrich) {
		return (
			<CreativeWork
				text={children}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</CreativeWork>
		)
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`stage-direction direction-${type} placement-${placement}`}
			data-category={category}
			data-character-id={characterId}
			data-placement={placement}
			data-type={type}
			itemProp="workExample"
			{...props}
		>
			{children}
		</Element>
	)
}
