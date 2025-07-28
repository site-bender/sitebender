import type BaseProps from "../../../../../../types/index.ts"
import type { MotorcycleRepairProps } from "../../../../../../types/Thing/Organization/LocalBusiness/AutomotiveBusiness/MotorcycleRepair/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = MotorcycleRepairProps & BaseProps

export default function MotorcycleRepair({
	_type = "MotorcycleRepair",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AutomotiveBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
