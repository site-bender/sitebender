/**
 * When.ChangeComplete (authoring alias for On.Change)
 */

import type { OnMarker } from "../../On/index.tsx"

export type Props = {
  target?: string
  children?: JSX.Element | Array<JSX.Element>
}

export default function ChangeComplete({ target, children }: Props): OnMarker {
  return { __kind: "control:on", event: "Change", target, handler: children }
}
