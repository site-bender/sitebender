import type BaseProps from "../../../../../../../types/index.ts"
import type OccupationalTherapyProps from "../../../../../../../types/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/OccupationalTherapy/index.ts"

import MedicalTherapy from "../index.tsx"

export type Props = OccupationalTherapyProps & BaseProps

export default function OccupationalTherapy({
	_type = "OccupationalTherapy",
	children,
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
		>{children}</MedicalTherapy>
	)
}
