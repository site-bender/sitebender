import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { HealthPlanNetworkProps } from "../../../../types/Thing/Intangible/HealthPlanNetwork/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	HealthPlanNetworkProps,
	"HealthPlanNetwork",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function HealthPlanNetwork({
	healthPlanCostSharing,
	healthPlanNetworkId,
	healthPlanNetworkTier,
	schemaType = "HealthPlanNetwork",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				healthPlanCostSharing,
				healthPlanNetworkId,
				healthPlanNetworkTier,
				...subtypeProperties,
			}}
		/>
	)
}
