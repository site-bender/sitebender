import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type MedicalTherapyProps from "../../../../../../../types/Thing/MedicalTherapy/index.ts"
import type PalliativeProcedureProps from "../../../../../../../types/Thing/PalliativeProcedure/index.ts"

import MedicalTherapy from "../index.tsx"

// PalliativeProcedure adds no properties to the MedicalTherapy schema type
export type Props = BaseComponentProps<
	PalliativeProcedureProps,
	"PalliativeProcedure",
	ExtractLevelProps<PalliativeProcedureProps, MedicalTherapyProps>
>

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
		>{children}</PalliativeProcedureProps>
	)
}
