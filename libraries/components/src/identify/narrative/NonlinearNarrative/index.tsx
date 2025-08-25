import type { BaseProps } from "../../../../../types/index.ts"

import { getDataAttributes } from "../../../../utilities/getDataAttributes/index.ts"

export type Props = BaseProps & {
	element?: "div" | "section" | "article" | "aside"
	define?: "microdata" | "linkedData" | "both"
	/**
	 * Type of non-linear structure (e.g., "parallel", "circular", "fragmented", "branching")
	 */
	structure?: string
	/**
	 * Sequence indicator for this segment
	 */
	sequence?: number | string
	/**
	 * Timeline this segment belongs to (for parallel narratives)
	 */
	timeline?: string
	/**
	 * Temporal relationship (e.g., "simultaneous", "retrospective", "alternative")
	 */
	temporalRelation?: string
}

/**
 * Wrapper for non-linear storytelling segments that don't follow chronological order.
 * Used for parallel narratives, circular structures, or fragmented timelines.
 *
 * @example
 * <NonlinearNarrative structure="parallel" timeline="past">
 *   <p>Meanwhile, twenty years earlier...</p>
 * </NonlinearNarrative>
 *
 * @example
 * <NonlinearNarrative structure="circular" sequence="end-as-beginning">
 *   <p>And so we return to where we started...</p>
 * </NonlinearNarrative>
 */
export default function NonlinearNarrative({
	element: Element = "section",
	define,
	structure,
	sequence,
	timeline,
	temporalRelation,
	children,
	...props
}: Props): JSX.Element {
	const dataAttributes = getDataAttributes({
		component: "nonlinear-narrative",
		structure,
		sequence: sequence?.toString(),
		timeline,
		temporalRelation,
	})

	return (
		<Element
			{...props}
			{...dataAttributes}
			class={`nonlinear-narrative ${props.class || ""}`}
		>
			{children}
		</Element>
	)
}
