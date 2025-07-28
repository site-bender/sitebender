import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalRiskEstimatorProps } from "../../../../types/Thing/MedicalEntity/MedicalRiskEstimator/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalRiskEstimatorProps,
	"MedicalRiskEstimator",
	ExtractLevelProps<ThingProps, MedicalEntityProps>
>

export default function MedicalRiskEstimator({
	estimatesRiskOf,
	includedRiskFactor,
	schemaType = "MedicalRiskEstimator",
	subtypeProperties = {},
	...props
}): Props {
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
