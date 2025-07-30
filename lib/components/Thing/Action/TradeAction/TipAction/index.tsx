import type BaseProps from "../../../../../types/index.ts"
import type TipActionProps from "../../../../../types/Thing/Action/TradeAction/TipAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = TipActionProps & BaseProps

export default function TipAction({
	recipient,
	_type = "TipAction",
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
