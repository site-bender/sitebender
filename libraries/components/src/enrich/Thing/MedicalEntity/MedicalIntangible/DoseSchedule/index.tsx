import type BaseProps from "../../../../../types/index.ts"
import type { DoseSchedule as DoseScheduleProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DoseScheduleProps & BaseProps

export default function DoseSchedule({
	_type = "DoseSchedule",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
