import type BaseProps from "../../../../types/index.ts"
import type MedicalRiskFactorProps from "../../../../types/Thing/MedicalEntity/MedicalRiskFactor/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalRiskFactorProps & BaseProps

export default function MedicalRiskFactor({
	increasesRiskOf,
	_type = "MedicalRiskFactor",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				increasesRiskOf,
				...subtypeProperties,
			}}
		>
			{children}
		</MedicalEntity>
	)
}
