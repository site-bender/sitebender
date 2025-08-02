import type BaseProps from "../../../../../types/index.ts"
import type RentActionProps from "../../../../../types/Thing/Action/TradeAction/RentAction/index.ts"

import TradeAction from "../index.tsx"

export type Props = RentActionProps & BaseProps

export default function RentAction({
	landlord,
	realEstateAgent,
	_type = "RentAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TradeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				landlord,
				realEstateAgent,
				...subtypeProperties,
			}}
		>
			{children}
		</TradeAction>
	)
}
