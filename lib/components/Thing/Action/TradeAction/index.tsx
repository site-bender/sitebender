import type BaseProps from "../../../../types/index.ts"
import type TradeActionProps from "../../../../types/Thing/Action/TradeAction/index.ts"

import Action from "../index.tsx"

export type Props = TradeActionProps & BaseProps

export default function TradeAction({
	price,
	priceCurrency,
	priceSpecification,
	_type = "TradeAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Action
			{...props}
			_type={_type}
			subtypeProperties={{
				price,
				priceCurrency,
				priceSpecification,
				...subtypeProperties,
			}}
		>
			{children}
		</Action>
	)
}
