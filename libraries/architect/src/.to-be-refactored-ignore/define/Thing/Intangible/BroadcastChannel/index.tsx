import type BaseProps from "../../../../../types/index.ts"
import type { BroadcastChannel as BroadcastChannelProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = BroadcastChannelProps & BaseProps

export default function BroadcastChannel({
	_type = "BroadcastChannel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
