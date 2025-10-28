//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { OnMarker } from "../../On/index.tsx"

export type Props = {
	target?: string
	children?: JSX.Element | Array<JSX.Element>
}

export default function Focused({ target, children }: Props): OnMarker {
	return { __kind: "control:on", event: "Focus", target, handler: children }
}
