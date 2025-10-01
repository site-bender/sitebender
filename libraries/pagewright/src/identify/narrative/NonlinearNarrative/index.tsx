import getDataAttributes from "../../../helpers/getDataAttributes/index.ts"

type BaseProps = Record<string, unknown>

export type Props = BaseProps & {
	element?: "div" | "section" | "article" | "aside"
	define?: "microdata" | "linkedData" | "both"
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	structure?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	sequence?: number | string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	timeline?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	temporalRelation?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function NonlinearNarrative({
	element: Element = "section",
	define: _define,
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
