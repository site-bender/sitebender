import type BaseProps from "../../../../../types/index.ts"
import type ReceiveActionProps from "../../../../../types/Thing/Action/TransferAction/ReceiveAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = ReceiveActionProps & BaseProps

export default function ReceiveAction({
	deliveryMethod,
	sender,
	_type = "ReceiveAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TransferAction
			{...props}
			_type={_type}
			subtypeProperties={{
				deliveryMethod,
				sender,
				...subtypeProperties,
			}}
		/>
	)
}
