import type BaseProps from "../../../../../types/index.ts"
import type PayActionProps from "../../../../../types/Thing/Action/TradeAction/PayAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = PayActionProps & BaseProps

export default function PayAction({
	recipient,
	_type = "PayAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TradeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				recipient,
				...subtypeProperties,
			}}
		>{children}</TradeAction>
	)
}
