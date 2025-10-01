import getDataAttributes from "../../../helpers/getDataAttributes/index.ts"

type BaseProps = Record<string, unknown>

export type Props = BaseProps & {
	element?: "div" | "section" | "article" | "p"
	define?: "microdata" | "linkedData" | "both"
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	perspective?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	narrator?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	reliability?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	access?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function PointOfView({
	element: Element = "div",
	define: _define,
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
