import type BaseProps from "../../../../../../types/index.ts"
import type CheckOutActionProps from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/CheckOutAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = CheckOutActionProps & BaseProps

export default function CheckOutAction({
	_type = "CheckOutAction",
	children,
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
		>
			{children}
		</CommunicateAction>
	)
}
