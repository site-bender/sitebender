import type BaseProps from "../../../../../../types/index.ts"
import type { CancelActionProps } from "../../../../../../types/Thing/Action/OrganizeAction/PlanAction/CancelAction/index.ts"

import PlanAction from "../index.tsx"

export type Props = CancelActionProps & BaseProps

export default function CancelAction({
	_type = "CancelAction",
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
