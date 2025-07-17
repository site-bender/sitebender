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
	schemaType = "PalliativeProcedure",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalTherapy
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
