import type BaseProps from "../../../../../../types/index.ts"
import type MedicalSymptomProps from "../../../../../../types/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/MedicalSymptom/index.ts"

import MedicalSignOrSymptom from "../index.tsx"

export type Props = MedicalSymptomProps & BaseProps

export default function MedicalSymptom({
	_type = "MedicalSymptom",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalSignOrSymptom
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
