import type BaseProps from "../../../../types/index.ts"
import { getDataAttributes } from "../../../helpers/getDataAttributes/index.ts"

export type Props = BaseProps & {
	element?: "span" | "div" | "section" | "aside"
	define?: "microdata" | "linkedData" | "both"
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
	define: _define,
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
			className={`metafiction`}
		>
			{children}
		</Element>
	)

	// For metafiction, we could potentially define with CreativeWork schema
	// but it's primarily a narrative technique marker
	return baseElement
}
