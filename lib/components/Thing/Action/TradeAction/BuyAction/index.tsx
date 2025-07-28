import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TradeActionProps } from "../../../../../types/Thing/Action/TradeAction/index.ts"
import type { BuyActionProps } from "../../../../../types/Thing/Action/TradeAction/BuyAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = BaseComponentProps<
	BuyActionProps,
	"BuyAction",
	ExtractLevelProps<ThingProps, ActionProps, TradeActionProps>
>

export default function BuyAction({
	seller,
	vendor,
	warrantyPromise,
	schemaType = "BuyAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<TradeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				seller,
				vendor,
				warrantyPromise,
				...subtypeProperties,
			}}
		/>
	)
}
