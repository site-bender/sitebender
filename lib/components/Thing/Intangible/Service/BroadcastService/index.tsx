import type BaseProps from "../../../../../types/index.ts"
import type { BroadcastService as BroadcastServiceProps } from "../../../../../types/index.ts"

import Service from "../index.tsx"

export type Props = BroadcastServiceProps & BaseProps

export default function BroadcastService({
	_type = "BroadcastService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
