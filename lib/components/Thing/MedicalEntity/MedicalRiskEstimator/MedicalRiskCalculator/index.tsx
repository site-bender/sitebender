import type BaseProps from "../../../../../types/index.ts"
import type { MedicalRiskCalculatorProps } from "../../../../../types/Thing/MedicalEntity/MedicalRiskEstimator/MedicalRiskCalculator/index.ts"

import MedicalRiskEstimator from "../index.tsx"

export type Props = MedicalRiskCalculatorProps & BaseProps

export default function MedicalRiskCalculator({
	_type = "MedicalRiskCalculator",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalRiskEstimator
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
