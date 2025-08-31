/**
 * When.LostFocus (authoring alias for On.Blur)
 */

import type { OnMarker } from "../../On/index.tsx"

export type Props = {
	target?: string
	children?: JSX.Element | Array<JSX.Element>
}

export default function LostFocus({ target, children }: Props): OnMarker {
	return { __kind: "control:on", event: "Blur", target, handler: children }
}
