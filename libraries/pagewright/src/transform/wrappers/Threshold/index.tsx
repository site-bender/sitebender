//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type ThresholdProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Threshold({ children }: ThresholdProps): JSX.Element {
	return children as JSX.Element
}
