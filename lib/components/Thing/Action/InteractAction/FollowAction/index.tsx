import type BaseProps from "../../../../../types/index.ts"
import type { FollowAction as FollowActionProps } from "../../../../../types/index.ts"

import InteractAction from "../index.tsx"

export type Props = FollowActionProps & BaseProps

export default function FollowAction({
	_type = "FollowAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
