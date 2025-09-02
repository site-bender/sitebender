/**
 * When.Submitted (authoring alias for On.Submit)
 */

import type { OnMarker } from "../../On/index.tsx"

export type Props = {
	target?: string
	children?: JSX.Element | Array<JSX.Element>
}

export default function Submitted({ target, children }: Props): OnMarker {
	return { __kind: "control:on", event: "Submit", target, handler: children }
}
