//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type ByProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function By({ children }: ByProps): JSX.Element {
	return children as JSX.Element
}
