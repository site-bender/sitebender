import type BaseProps from "../../../../types/index.ts"
import type { HealthPlanNetworkProps } from "../../../../types/Thing/Intangible/HealthPlanNetwork/index.ts"

import Intangible from "../index.tsx"

export type Props = HealthPlanNetworkProps & BaseProps

export default function HealthPlanNetwork({
	healthPlanCostSharing,
	healthPlanNetworkId,
	healthPlanNetworkTier,
	_type = "HealthPlanNetwork",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				healthPlanCostSharing,
				healthPlanNetworkId,
				healthPlanNetworkTier,
				...subtypeProperties,
			}}
		/>
	)
}
