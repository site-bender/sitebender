import type { BaseProps } from "../../../../types/index.ts"

import { getDataAttributes } from "../../../../utilities/getDataAttributes/index.ts"

export type Props = BaseProps & {
	element?: "span" | "div" | "em" | "strong"
	enrich?: "microdata" | "linkedData" | "both"
	/**
	 * What this symbol represents
	 */
	represents?: string
	/**
	 * Type of symbolism (e.g., "metaphor", "allegory", "motif", "archetype")
	 */
	symbolType?: string
	/**
	 * How explicit the symbolism is (e.g., "subtle", "apparent", "explicit")
	 */
	explicitness?: string
	/**
	 * Thematic connection (e.g., "death", "rebirth", "freedom", "oppression")
	 */
	theme?: string
}

/**
 * Marks symbolic representations in narrative text.
 * Used for metaphors, allegories, motifs, and other symbolic elements.
 *
 * @example
 * <Symbolism represents="hope" symbolType="metaphor">
 *   The single green shoot pushing through the concrete
 * </Symbolism>
 *
 * @example
 * <Symbolism represents="isolation" theme="loneliness" symbolType="motif">
 *   the locked door
 * </Symbolism>
 */
export default function Symbolism({
	element: Element = "span",
	enrich,
	represents,
	symbolType,
	explicitness,
	theme,
	children,
	...props
}: Props): JSX.Element {
	const dataAttributes = getDataAttributes({
		component: "symbolism",
		represents,
		symbolType,
		explicitness,
		theme,
	})

	return (
		<Element
			{...props}
			{...dataAttributes}
			class={`symbolism ${props.class || ""}`}
			aria-label={represents ? `Symbol representing ${represents}` : undefined}
		>
			{children}
		</Element>
	)
}
