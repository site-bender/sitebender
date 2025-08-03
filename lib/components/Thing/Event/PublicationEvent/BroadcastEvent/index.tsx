import type BaseProps from "../../../../../types/index.ts"
import type { BroadcastEvent as BroadcastEventProps } from "../../../../../types/index.ts"

import PublicationEvent from "../index.tsx"

export type Props = BroadcastEventProps & BaseProps

export default function BroadcastEvent({
	_type = "BroadcastEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
