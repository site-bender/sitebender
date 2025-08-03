import type BaseProps from "../../../../../../types/index.ts"
import type { ReportedDoseSchedule as ReportedDoseScheduleProps } from "../../../../../../types/index.ts"

import DoseSchedule from "../index.tsx"

export type Props = ReportedDoseScheduleProps & BaseProps

export default function ReportedDoseSchedule({
	_type = "ReportedDoseSchedule",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
