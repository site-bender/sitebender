import type { BaseProps } from "../../../../types/index.ts"

import { getDataAttributes } from "../../../../utilities/getDataAttributes/index.ts"

export type Props = BaseProps & {
	element?: "div" | "section" | "article" | "p"
	enrich?: "microdata" | "linkedData" | "both"
	/**
	 * Narrative perspective (e.g., "first-person", "second-person", "third-person-limited", "third-person-omniscient")
	 */
	perspective?: string
	/**
	 * The narrator or character whose POV this is
	 */
	narrator?: string
	/**
	 * Reliability of the narrator (e.g., "reliable", "unreliable", "ambiguous")
	 */
	reliability?: string
	/**
	 * Level of access to thoughts (e.g., "external", "internal", "omniscient")
	 */
	access?: string
}

/**
 * Marks narrative sections with a specific point of view or perspective.
 * Used to indicate shifts in narrative voice or focalization.
 *
 * @example
 * <PointOfView perspective="first-person" narrator="Alice">
 *   I never thought I'd see the day when...
 * </PointOfView>
 *
 * @example
 * <PointOfView perspective="third-person-limited" narrator="omniscient" access="internal">
 *   She wondered if anyone else noticed the strange occurrence.
 * </PointOfView>
 */
export default function PointOfView({
	element: Element = "div",
	enrich,
	perspective,
	narrator,
	reliability,
	access,
	children,
	...props
}: Props): JSX.Element {
	const dataAttributes = getDataAttributes({
		component: "point-of-view",
		perspective,
		narrator,
		reliability,
		access,
	})

	return (
		<Element
			{...props}
			{...dataAttributes}
			class={`point-of-view ${props.class || ""}`}
			aria-label={narrator ? `Point of view: ${narrator}` : undefined}
		>
			{children}
		</Element>
	)
}
