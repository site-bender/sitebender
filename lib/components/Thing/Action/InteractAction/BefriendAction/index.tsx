import type BaseProps from "../../../../../types/index.ts"
import type { BefriendAction as BefriendActionProps } from "../../../../../types/index.ts"

import InteractAction from "../index.tsx"

export type Props = BefriendActionProps & BaseProps

export default function BefriendAction({
	_type = "BefriendAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
