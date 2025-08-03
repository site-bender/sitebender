import type BaseProps from "../../../../../types/index.ts"
import type { DayOfWeek as DayOfWeekProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = DayOfWeekProps & BaseProps

export default function DayOfWeek({
	_type = "DayOfWeek",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
