import type BaseProps from "../../../../types/index.ts"
import type EnergyConsumptionDetailsProps from "../../../../types/Thing/Intangible/EnergyConsumptionDetails/index.ts"

import Intangible from "../index.tsx"

export type Props = EnergyConsumptionDetailsProps & BaseProps

export default function EnergyConsumptionDetails({
	energyEfficiencyScaleMax,
	energyEfficiencyScaleMin,
	hasEnergyEfficiencyCategory,
	_type = "EnergyConsumptionDetails",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				energyEfficiencyScaleMax,
				energyEfficiencyScaleMin,
				hasEnergyEfficiencyCategory,
				...subtypeProperties,
			}}
		/>
	)
}
