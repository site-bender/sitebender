import type BaseProps from "../../../../../../../types/index.ts"
import type PalliativeProcedureProps from "../../../../../../../types/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/PalliativeProcedure/index.ts"

import MedicalTherapy from "../index.tsx"

// PalliativeProcedure adds no properties to the ListItem schema type
export type Props = PalliativeProcedureProps & BaseProps

export default function PalliativeProcedure({
	_type = "PalliativeProcedure",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalTherapy
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</MedicalTherapy>
	)
}
