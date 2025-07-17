import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalRiskEstimatorProps from "../../../../../types/Thing/MedicalRiskEstimator/index.ts"
import type MedicalRiskScoreProps from "../../../../../types/Thing/MedicalRiskScore/index.ts"

import MedicalRiskEstimator from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalRiskScoreProps,
	"MedicalRiskScore",
	ExtractLevelProps<MedicalRiskScoreProps, MedicalRiskEstimatorProps>
>

export default function MedicalRiskScore(
	{
		algorithm,
		schemaType = "MedicalRiskScore",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalRiskEstimator
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				algorithm,
				...subtypeProperties,
			}}
		/>
	)
}
