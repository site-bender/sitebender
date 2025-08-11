import { getDataAttributes } from "../../../../utilities/getDataAttributes/index.ts"
import type { BaseProps } from "../../../../types/index.ts"

export type Props = BaseProps & {
	element?: "span" | "div" | "section" | "aside"
	enrich?: "microdata" | "linkedData" | "both"
	/**
	 * Type of metafiction (e.g., "author-intrusion", "breaking-fourth-wall", "frame-story")
	 */
	metaType?: string
	/**
	 * Level of self-awareness (e.g., "subtle", "explicit", "parody")
	 */
	selfAwareness?: string
	/**
	 * Target of reference (e.g., "narrative-device", "reader", "author", "genre")
	 */
	referenceTarget?: string
}

/**
 * Marks self-referential narrative elements that acknowledge their fictional nature.
 * Used for text that breaks the fourth wall or comments on its own narrative construction.
 * 
 * @example
 * <Metafiction metaType="author-intrusion">
 *   Dear reader, you may wonder why I'm telling you this...
 * </Metafiction>
 * 
 * @example
 * <Metafiction selfAwareness="explicit" referenceTarget="genre">
 *   This isn't like those detective stories where the butler did it.
 * </Metafiction>
 */
export default function Metafiction({
	element: Element = "span",
	enrich,
	metaType,
	selfAwareness,
	referenceTarget,
	children,
	...props
}: Props): JSX.Element {
	const dataAttributes = getDataAttributes({
		component: "metafiction",
		metaType,
		selfAwareness,
		referenceTarget,
	})

	const baseElement = (
		<Element
			{...props}
			{...dataAttributes}
			class={`metafiction ${props.class || ""}`}
		>
			{children}
		</Element>
	)

	// For metafiction, we could potentially enrich with CreativeWork schema
	// but it's primarily a narrative technique marker
	return baseElement
}