import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type QuoteActionProps from "../../../../../types/Thing/QuoteAction/index.ts"
import type TradeActionProps from "../../../../../types/Thing/TradeAction/index.ts"

import TradeAction from "../index.tsx"

// QuoteAction adds no properties to the TradeAction schema type
export type Props = BaseComponentProps<
	QuoteActionProps,
	"QuoteAction",
	ExtractLevelProps<QuoteActionProps, TradeActionProps>
>

export default function QuoteAction({
	schemaType = "QuoteAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<TradeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
