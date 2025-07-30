import type BaseProps from "../../../../../types/index.ts"
import type SendActionProps from "../../../../../types/Thing/Action/TransferAction/SendAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = SendActionProps & BaseProps

export default function SendAction({
	deliveryMethod,
	recipient,
	_type = "SendAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TransferAction
			{...props}
			_type={_type}
			subtypeProperties={{
				deliveryMethod,
				recipient,
				...subtypeProperties,
			}}
		>{children}</TransferAction>
	)
}
