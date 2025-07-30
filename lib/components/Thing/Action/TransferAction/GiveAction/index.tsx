import type BaseProps from "../../../../../types/index.ts"
import type GiveActionProps from "../../../../../types/Thing/Action/TransferAction/GiveAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = GiveActionProps & BaseProps

export default function GiveAction({
	recipient,
	_type = "GiveAction",
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
		>{children}</TransferAction>
	)
}
