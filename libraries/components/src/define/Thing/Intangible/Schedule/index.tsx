import type BaseProps from "../../../../../types/index.ts"
import type { Schedule as ScheduleProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ScheduleProps & BaseProps

export default function Schedule({
	_type = "Schedule",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
