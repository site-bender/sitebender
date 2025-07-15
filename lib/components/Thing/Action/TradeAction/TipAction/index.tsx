import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type TipActionProps from "../../../../../types/Thing/TipAction/index.ts"
import type TradeActionProps from "../../../../../types/Thing/TradeAction/index.ts"

import TradeAction from "./index.tsx"

export type Props = BaseComponentProps<
	TipActionProps,
	"TipAction",
	ExtractLevelProps<TipActionProps, TradeActionProps>
>

export default function TipAction(
	{
		recipient,
		schemaType = "TipAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<TradeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				recipient,
				...subtypeProperties,
			}}
		/>
	)
}
