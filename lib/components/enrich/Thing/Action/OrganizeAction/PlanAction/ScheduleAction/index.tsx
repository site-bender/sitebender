import type BaseProps from "../../../../../../types/index.ts"
import type { ScheduleAction as ScheduleActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ScheduleActionProps & BaseProps

export default function ScheduleAction({
	_type = "ScheduleAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
