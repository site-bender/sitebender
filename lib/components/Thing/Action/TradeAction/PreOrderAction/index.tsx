import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type PreOrderActionProps from "../../../../../types/Thing/PreOrderAction/index.ts"
import type TradeActionProps from "../../../../../types/Thing/TradeAction/index.ts"

import TradeAction from "../index.tsx"

// PreOrderAction adds no properties to the TradeAction schema type
export type Props = BaseComponentProps<
	PreOrderActionProps,
	"PreOrderAction",
	ExtractLevelProps<PreOrderActionProps, TradeActionProps>
>

export default function PreOrderAction({
	schemaType = "PreOrderAction",
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
