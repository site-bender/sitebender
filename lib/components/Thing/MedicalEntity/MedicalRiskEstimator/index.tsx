import type BaseProps from "../../../../types/index.ts"
import type MedicalRiskEstimatorProps from "../../../../types/Thing/MedicalEntity/MedicalRiskEstimator/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalRiskEstimatorProps & BaseProps

export default function MedicalRiskEstimator({
	estimatesRiskOf,
	includedRiskFactor,
	_type = "MedicalRiskEstimator",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				estimatesRiskOf,
				includedRiskFactor,
				...subtypeProperties,
			}}
		>
			{children}
		</MedicalEntity>
	)
}
