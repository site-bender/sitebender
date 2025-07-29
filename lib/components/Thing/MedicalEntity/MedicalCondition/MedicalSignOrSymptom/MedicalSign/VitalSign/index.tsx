import type BaseProps from "../../../../../../../types/index.ts"
import type VitalSignProps from "../../../../../../../types/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/MedicalSign/VitalSign/index.ts"

import MedicalSign from "../index.tsx"

export type Props = VitalSignProps & BaseProps

export default function VitalSign({
	_type = "VitalSign",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalSign
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
