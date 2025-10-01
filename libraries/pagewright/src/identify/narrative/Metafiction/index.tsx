import type BaseProps from "../../../../types/index.ts"

import getDataAttributes from "../../../helpers/getDataAttributes/index.ts"

export type Props = BaseProps & {
	element?: "span" | "div" | "section" | "aside"
	define?: "microdata" | "linkedData" | "both"
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	metaType?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	selfAwareness?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	referenceTarget?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
