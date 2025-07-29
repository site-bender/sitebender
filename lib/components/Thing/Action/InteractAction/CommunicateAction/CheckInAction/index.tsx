import type BaseProps from "../../../../../../types/index.ts"
import type CheckInActionProps from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/CheckInAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = CheckInActionProps & BaseProps

export default function CheckInAction({
	_type = "CheckInAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CommunicateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
