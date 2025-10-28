import getDataAttributes from "../../../helpers/getDataAttributes/index.ts"

type BaseProps = Record<string, unknown>

export type Props = BaseProps & {
	element?: "span" | "div" | "em" | "strong"
	define?: "microdata" | "linkedData" | "both"
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	represents?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	symbolType?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	explicitness?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	theme?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function Symbolism({
	element: Element = "span",
	define: _define,
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
