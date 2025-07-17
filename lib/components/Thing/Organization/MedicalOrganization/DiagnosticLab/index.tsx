import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DiagnosticLabProps from "../../../../../types/Thing/DiagnosticLab/index.ts"
import type MedicalOrganizationProps from "../../../../../types/Thing/MedicalOrganization/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = BaseComponentProps<
	DiagnosticLabProps,
	"DiagnosticLab",
	ExtractLevelProps<DiagnosticLabProps, MedicalOrganizationProps>
>

export default function DiagnosticLab(
	{
		availableTest,
		schemaType = "DiagnosticLab",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalOrganization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				availableTest,
				...subtypeProperties,
			}}
		/>
	)
}
