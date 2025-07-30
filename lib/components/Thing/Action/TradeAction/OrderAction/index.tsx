import type BaseProps from "../../../../../types/index.ts"
import type OrderActionProps from "../../../../../types/Thing/Action/TradeAction/OrderAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = OrderActionProps & BaseProps

export default function OrderAction({
	deliveryMethod,
	_type = "OrderAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TradeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				deliveryMethod,
				...subtypeProperties,
			}}
		>{children}</TradeAction>
	)
}
