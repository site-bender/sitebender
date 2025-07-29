import type BaseProps from "../../../../../../types/index.ts"
import type ReserveActionProps from "../../../../../../types/Thing/Action/OrganizeAction/PlanAction/ReserveAction/index.ts"

import PlanAction from "../index.tsx"

export type Props = ReserveActionProps & BaseProps

export default function ReserveAction({
	_type = "ReserveAction",
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
