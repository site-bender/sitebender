import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type SellActionProps from "../../../../../types/Thing/SellAction/index.ts"
import type TradeActionProps from "../../../../../types/Thing/TradeAction/index.ts"

import TradeAction from "./index.tsx"

export type Props = BaseComponentProps<
	SellActionProps,
	"SellAction",
	ExtractLevelProps<SellActionProps, TradeActionProps>
>

export default function SellAction(
	{
		buyer,
		warrantyPromise,
		schemaType = "SellAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
