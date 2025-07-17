import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DiagnosticProcedureProps from "../../../../../types/Thing/DiagnosticProcedure/index.ts"
import type MedicalProcedureProps from "../../../../../types/Thing/MedicalProcedure/index.ts"

import MedicalProcedure from "../index.tsx"

// DiagnosticProcedure adds no properties to the MedicalProcedure schema type
export type Props = BaseComponentProps<
	DiagnosticProcedureProps,
	"DiagnosticProcedure",
	ExtractLevelProps<DiagnosticProcedureProps, MedicalProcedureProps>
>

export default function DiagnosticProcedure({
	schemaType = "DiagnosticProcedure",
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
