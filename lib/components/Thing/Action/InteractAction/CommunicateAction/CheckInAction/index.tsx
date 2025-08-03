import type BaseProps from "../../../../../../types/index.ts"
import type { CheckInAction as CheckInActionProps } from "../../../../../../types/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = CheckInActionProps & BaseProps

export default function CheckInAction({
	_type = "CheckInAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
