import type BaseProps from "../../../../../types/index.ts"
import type BuyActionProps from "../../../../../types/Thing/Action/TradeAction/BuyAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = BuyActionProps & BaseProps

export default function BuyAction({
	seller,
	vendor,
	warrantyPromise,
	_type = "BuyAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TradeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				seller,
				vendor,
				warrantyPromise,
				...subtypeProperties,
			}}
		>{children}</TradeAction>
	)
}
