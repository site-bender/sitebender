import type BaseProps from "../../../../../../../types/index.ts"
import type PhysicalTherapyProps from "../../../../../../../types/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/PhysicalTherapy/index.ts"

import MedicalTherapy from "../index.tsx"

export type Props = PhysicalTherapyProps & BaseProps

export default function PhysicalTherapy({
	_type = "PhysicalTherapy",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalTherapy
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
