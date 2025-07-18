import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalProcedureProps from "../../../../../types/Thing/MedicalProcedure/index.ts"
import type SurgicalProcedureProps from "../../../../../types/Thing/SurgicalProcedure/index.ts"

import MedicalProcedure from "../index.tsx"

// SurgicalProcedure adds no properties to the MedicalProcedure schema type
export type Props = BaseComponentProps<
	SurgicalProcedureProps,
	"SurgicalProcedure",
	ExtractLevelProps<SurgicalProcedureProps, MedicalProcedureProps>
>

export default function SurgicalProcedure({
	schemaType = "SurgicalProcedure",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalProcedure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
