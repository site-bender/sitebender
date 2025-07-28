import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { EnergyConsumptionDetailsProps } from "../../../../types/Thing/Intangible/EnergyConsumptionDetails/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	EnergyConsumptionDetailsProps,
	"EnergyConsumptionDetails",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function EnergyConsumptionDetails({
	energyEfficiencyScaleMax,
	energyEfficiencyScaleMin,
	hasEnergyEfficiencyCategory,
	schemaType = "EnergyConsumptionDetails",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				energyEfficiencyScaleMax,
				energyEfficiencyScaleMin,
				hasEnergyEfficiencyCategory,
				...subtypeProperties,
			}}
		/>
	)
}
