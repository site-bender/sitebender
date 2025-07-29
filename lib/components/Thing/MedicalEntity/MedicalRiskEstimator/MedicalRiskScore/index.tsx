import type BaseProps from "../../../../../types/index.ts"
import type MedicalRiskScoreProps from "../../../../../types/Thing/MedicalEntity/MedicalRiskEstimator/MedicalRiskScore/index.ts"

import MedicalRiskEstimator from "../index.tsx"

export type Props = MedicalRiskScoreProps & BaseProps

export default function MedicalRiskScore({
	algorithm,
	_type = "MedicalRiskScore",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalRiskEstimator
			{...props}
			_type={_type}
			subtypeProperties={{
				algorithm,
				...subtypeProperties,
			}}
		/>
	)
}
