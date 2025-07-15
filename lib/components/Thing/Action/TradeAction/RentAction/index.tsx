import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type RentActionProps from "../../../../../types/Thing/RentAction/index.ts"
import type TradeActionProps from "../../../../../types/Thing/TradeAction/index.ts"

import TradeAction from "./index.tsx"

export type Props = BaseComponentProps<
	RentActionProps,
	"RentAction",
	ExtractLevelProps<RentActionProps, TradeActionProps>
>

export default function RentAction(
	{
		landlord,
		realEstateAgent,
		schemaType = "RentAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
