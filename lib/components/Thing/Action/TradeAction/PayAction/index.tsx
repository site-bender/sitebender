import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type PayActionProps from "../../../../../types/Thing/PayAction/index.ts"
import type TradeActionProps from "../../../../../types/Thing/TradeAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = BaseComponentProps<
	PayActionProps,
	"PayAction",
	ExtractLevelProps<PayActionProps, TradeActionProps>
>

export default function PayAction(
	{
		recipient,
		schemaType = "PayAction",
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
