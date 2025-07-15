import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type TradeActionProps from "../../../../types/Thing/TradeAction/index.ts"

import Action from "./index.tsx"

export type Props = BaseComponentProps<
	TradeActionProps,
	"TradeAction",
	ExtractLevelProps<TradeActionProps, ActionProps>
>

export default function TradeAction(
	{
		price,
		priceCurrency,
		priceSpecification,
		schemaType = "TradeAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				price,
				priceCurrency,
				priceSpecification,
				...subtypeProperties,
			}}
		/>
	)
}
