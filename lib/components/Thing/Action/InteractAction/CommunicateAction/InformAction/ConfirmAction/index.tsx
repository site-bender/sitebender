import type BaseProps from "../../../../../../../types/index.ts"
import type ConfirmActionProps from "../../../../../../../types/Thing/Action/InteractAction/CommunicateAction/InformAction/ConfirmAction/index.ts"

import InformAction from "../index.tsx"

export type Props = ConfirmActionProps & BaseProps

export default function ConfirmAction({
	_type = "ConfirmAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InformAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</InformAction>
	)
}
