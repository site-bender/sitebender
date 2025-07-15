import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"
import type MedicalRiskEstimatorProps from "../../../../types/Thing/MedicalRiskEstimator/index.ts"

import MedicalEntity from "./index.tsx"

export type Props = BaseComponentProps<
	MedicalRiskEstimatorProps,
	"MedicalRiskEstimator",
	ExtractLevelProps<MedicalRiskEstimatorProps, MedicalEntityProps>
>

export default function MedicalRiskEstimator(
	{
		estimatesRiskOf,
		includedRiskFactor,
		schemaType = "MedicalRiskEstimator",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				estimatesRiskOf,
				includedRiskFactor,
				...subtypeProperties,
			}}
		/>
	)
}
