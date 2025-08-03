import type BaseProps from "../../../../../types/index.ts"
import type { TelevisionChannel as TelevisionChannelProps } from "../../../../../types/index.ts"

import BroadcastChannel from "../index.tsx"

export type Props = TelevisionChannelProps & BaseProps

export default function TelevisionChannel({
	_type = "TelevisionChannel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
