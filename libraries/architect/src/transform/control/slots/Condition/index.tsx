//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = { children?: JSX.Element | Array<JSX.Element> }

export default function Condition({ children }: Props) {
	return { __kind: "slot:condition", children }
}
