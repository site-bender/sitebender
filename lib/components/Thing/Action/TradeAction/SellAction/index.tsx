import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TradeActionProps } from "../../../../../types/Thing/Action/TradeAction/index.ts"
import type { SellActionProps } from "../../../../../types/Thing/Action/TradeAction/SellAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = BaseComponentProps<
	SellActionProps,
	"SellAction",
	ExtractLevelProps<ThingProps, ActionProps, TradeActionProps>
>

export default function SellAction({
	buyer,
	warrantyPromise,
	schemaType = "SellAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<TradeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				buyer,
				warrantyPromise,
				...subtypeProperties,
			}}
		/>
	)
}
