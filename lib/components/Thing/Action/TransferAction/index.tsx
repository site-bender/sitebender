import type BaseProps from "../../../../types/index.ts"
import type TransferActionProps from "../../../../types/Thing/Action/TransferAction/index.ts"

import Action from "../index.tsx"

export type Props = TransferActionProps & BaseProps

export default function TransferAction({
	fromLocation,
	toLocation,
	_type = "TransferAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				fromLocation,
				toLocation,
				...subtypeProperties,
			}}
		>
			{children}
		</Action>
	)
}
