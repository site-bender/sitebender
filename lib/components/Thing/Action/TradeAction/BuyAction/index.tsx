import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BuyActionProps from "../../../../../types/Thing/BuyAction/index.ts"
import type TradeActionProps from "../../../../../types/Thing/TradeAction/index.ts"

import TradeAction from "./index.tsx"

export type Props = BaseComponentProps<
	BuyActionProps,
	"BuyAction",
	ExtractLevelProps<BuyActionProps, TradeActionProps>
>

export default function BuyAction(
	{
		seller,
		vendor,
		warrantyPromise,
		schemaType = "BuyAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
