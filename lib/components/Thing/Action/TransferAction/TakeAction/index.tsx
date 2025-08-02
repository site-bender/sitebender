import type BaseProps from "../../../../../types/index.ts"
import type TakeActionProps from "../../../../../types/Thing/Action/TransferAction/TakeAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = TakeActionProps & BaseProps

export default function TakeAction({
	_type = "TakeAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TransferAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</TransferAction>
	)
}
