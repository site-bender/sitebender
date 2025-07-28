import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalRiskEstimatorProps } from "../../../../../types/Thing/MedicalEntity/MedicalRiskEstimator/index.ts"
import type { MedicalRiskScoreProps } from "../../../../../types/Thing/MedicalEntity/MedicalRiskEstimator/MedicalRiskScore/index.ts"

import MedicalRiskEstimator from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalRiskScoreProps,
	"MedicalRiskScore",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalRiskEstimatorProps>
>

export default function MedicalRiskScore({
	algorithm,
	schemaType = "MedicalRiskScore",
	subtypeProperties = {},
	...props
}): Props {
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
