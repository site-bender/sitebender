import type BaseProps from "../../../../../types/index.ts"
import type PreOrderActionProps from "../../../../../types/Thing/Action/TradeAction/PreOrderAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = PreOrderActionProps & BaseProps

export default function PreOrderAction({
	_type = "PreOrderAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TradeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
