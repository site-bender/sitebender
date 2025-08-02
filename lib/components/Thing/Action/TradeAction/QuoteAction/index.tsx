import type BaseProps from "../../../../../types/index.ts"
import type QuoteActionProps from "../../../../../types/Thing/Action/TradeAction/QuoteAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = QuoteActionProps & BaseProps

export default function QuoteAction({
	_type = "QuoteAction",
	children,
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
		>
			{children}
		</TradeAction>
	)
}
