import type BaseProps from "../../../../../types/index.ts"
import type { LeaveAction as LeaveActionProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = LeaveActionProps & BaseProps

export default function LeaveAction({
	_type = "LeaveAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
