import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TradeActionProps } from "../../../../../types/Thing/Action/TradeAction/index.ts"
import type { TipActionProps } from "../../../../../types/Thing/Action/TradeAction/TipAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = BaseComponentProps<
	TipActionProps,
	"TipAction",
	ExtractLevelProps<ThingProps, ActionProps, TradeActionProps>
>

export default function TipAction({
	recipient,
	schemaType = "TipAction",
	subtypeProperties = {},
	...props
}): Props {
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
