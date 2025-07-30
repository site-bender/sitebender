import type BaseProps from "../../../../../types/index.ts"
import type MedicalSignOrSymptomProps from "../../../../../types/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/index.ts"

import MedicalCondition from "../index.tsx"

export type Props = MedicalSignOrSymptomProps & BaseProps

export default function MedicalSignOrSymptom({
	possibleTreatment,
	_type = "MedicalSignOrSymptom",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalCondition
			{...props}
			_type={_type}
			subtypeProperties={{
				possibleTreatment,
				...subtypeProperties,
			}}
		>{children}</MedicalCondition>
	)
}
