//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type ValueProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Value({ children }: ValueProps): JSX.Element {
	return children as JSX.Element
}
