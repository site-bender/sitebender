/**
 * When.Clicked (authoring alias for On.Click)
 */

import type { OnMarker } from "../../On/index.tsx"

export type Props = {
  target?: string
  children?: JSX.Element | Array<JSX.Element>
}

export default function Clicked({ target, children }: Props): OnMarker {
  return { __kind: "control:on", event: "Click", target, handler: children }
}
