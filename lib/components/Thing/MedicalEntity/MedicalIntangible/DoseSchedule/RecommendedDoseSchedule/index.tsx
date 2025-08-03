import type BaseProps from "../../../../../../types/index.ts"
import type { RecommendedDoseSchedule as RecommendedDoseScheduleProps } from "../../../../../../types/index.ts"

import DoseSchedule from "../index.tsx"

export type Props = RecommendedDoseScheduleProps & BaseProps

export default function RecommendedDoseSchedule({
	_type = "RecommendedDoseSchedule",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
