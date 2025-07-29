import type BaseProps from "../../../../../../types/index.ts"
import type ScheduleActionProps from "../../../../../../types/Thing/Action/OrganizeAction/PlanAction/ScheduleAction/index.ts"

import PlanAction from "../index.tsx"

export type Props = ScheduleActionProps & BaseProps

export default function ScheduleAction({
	_type = "ScheduleAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PlanAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
