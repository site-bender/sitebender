import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type OrderActionProps from "../../../../../types/Thing/OrderAction/index.ts"
import type TradeActionProps from "../../../../../types/Thing/TradeAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = BaseComponentProps<
	OrderActionProps,
	"OrderAction",
	ExtractLevelProps<OrderActionProps, TradeActionProps>
>

export default function OrderAction(
	{
		deliveryMethod,
		schemaType = "OrderAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<TradeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				deliveryMethod,
				...subtypeProperties,
			}}
		/>
	)
}
