import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TradeActionProps } from "../../../../../types/Thing/Action/TradeAction/index.ts"
import type { PayActionProps } from "../../../../../types/Thing/Action/TradeAction/PayAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = BaseComponentProps<
	PayActionProps,
	"PayAction",
	ExtractLevelProps<ThingProps, ActionProps, TradeActionProps>
>

export default function PayAction({
	recipient,
	schemaType = "PayAction",
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
