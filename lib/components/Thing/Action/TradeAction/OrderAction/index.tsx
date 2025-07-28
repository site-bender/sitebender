import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TradeActionProps } from "../../../../../types/Thing/Action/TradeAction/index.ts"
import type { OrderActionProps } from "../../../../../types/Thing/Action/TradeAction/OrderAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = BaseComponentProps<
	OrderActionProps,
	"OrderAction",
	ExtractLevelProps<ThingProps, ActionProps, TradeActionProps>
>

export default function OrderAction({
	deliveryMethod,
	schemaType = "OrderAction",
	subtypeProperties = {},
	...props
}): Props {
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
