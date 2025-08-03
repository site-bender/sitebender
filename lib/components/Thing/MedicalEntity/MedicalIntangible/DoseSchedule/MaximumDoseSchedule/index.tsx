import type BaseProps from "../../../../../../types/index.ts"
import type { MaximumDoseSchedule as MaximumDoseScheduleProps } from "../../../../../../types/index.ts"

import DoseSchedule from "../index.tsx"

export type Props = MaximumDoseScheduleProps & BaseProps

export default function MaximumDoseSchedule({
	_type = "MaximumDoseSchedule",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
