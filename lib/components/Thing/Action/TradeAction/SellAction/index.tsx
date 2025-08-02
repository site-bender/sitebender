import type BaseProps from "../../../../../types/index.ts"
import type SellActionProps from "../../../../../types/Thing/Action/TradeAction/SellAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = SellActionProps & BaseProps

export default function SellAction({
	buyer,
	warrantyPromise,
	_type = "SellAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TradeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				buyer,
				warrantyPromise,
				...subtypeProperties,
			}}
		>
			{children}
		</TradeAction>
	)
}
