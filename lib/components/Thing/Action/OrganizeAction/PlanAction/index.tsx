import type BaseProps from "../../../../../types/index.ts"
import type PlanActionProps from "../../../../../types/Thing/Action/OrganizeAction/PlanAction/index.ts"

import OrganizeAction from "../index.tsx"

export type Props = PlanActionProps & BaseProps

export default function PlanAction({
	scheduledTime,
	_type = "PlanAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<OrganizeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				scheduledTime,
				...subtypeProperties,
			}}
		>{children}</OrganizeAction>
	)
}
