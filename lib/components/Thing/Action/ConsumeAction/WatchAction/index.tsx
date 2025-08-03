import type BaseProps from "../../../../../types/index.ts"
import type { WatchAction as WatchActionProps } from "../../../../../types/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = WatchActionProps & BaseProps

export default function WatchAction({
	_type = "WatchAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
