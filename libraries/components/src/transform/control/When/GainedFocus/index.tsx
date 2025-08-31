/**
 * When.GainedFocus (authoring alias for On.Focus)
 */

import type { OnMarker } from "../../On/index.tsx"

export type Props = {
	target?: string
	children?: JSX.Element | Array<JSX.Element>
}

export default function GainedFocus({ target, children }: Props): OnMarker {
	return { __kind: "control:on", event: "Focus", target, handler: children }
}
