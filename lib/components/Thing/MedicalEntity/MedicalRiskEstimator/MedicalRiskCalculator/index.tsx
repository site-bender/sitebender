import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalRiskCalculatorProps from "../../../../../types/Thing/MedicalRiskCalculator/index.ts"
import type MedicalRiskEstimatorProps from "../../../../../types/Thing/MedicalRiskEstimator/index.ts"

import MedicalRiskEstimator from "../index.tsx"

// MedicalRiskCalculator adds no properties to the MedicalRiskEstimator schema type
export type Props = BaseComponentProps<
	MedicalRiskCalculatorProps,
	"MedicalRiskCalculator",
	ExtractLevelProps<MedicalRiskCalculatorProps, MedicalRiskEstimatorProps>
>

export default function MedicalRiskCalculator({
	schemaType = "MedicalRiskCalculator",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalRiskEstimator
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
