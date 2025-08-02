import type BaseProps from "../../../../../types/index.ts"
import type ReturnActionProps from "../../../../../types/Thing/Action/TransferAction/ReturnAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = ReturnActionProps & BaseProps

export default function ReturnAction({
	recipient,
	_type = "ReturnAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TransferAction
			{...props}
			_type={_type}
			subtypeProperties={{
				recipient,
				...subtypeProperties,
			}}
		>
			{children}
		</TransferAction>
	)
}
