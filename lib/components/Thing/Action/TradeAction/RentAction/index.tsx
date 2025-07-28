import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TradeActionProps } from "../../../../../types/Thing/Action/TradeAction/index.ts"
import type { RentActionProps } from "../../../../../types/Thing/Action/TradeAction/RentAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = BaseComponentProps<
	RentActionProps,
	"RentAction",
	ExtractLevelProps<ThingProps, ActionProps, TradeActionProps>
>

export default function RentAction({
	landlord,
	realEstateAgent,
	schemaType = "RentAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<TradeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				landlord,
				realEstateAgent,
				...subtypeProperties,
			}}
		/>
	)
}
