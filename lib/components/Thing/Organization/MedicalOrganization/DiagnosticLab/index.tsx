import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../../types/Thing/Organization/index.ts"
import type { MedicalOrganizationProps } from "../../../../../types/Thing/Organization/MedicalOrganization/index.ts"
import type { DiagnosticLabProps } from "../../../../../types/Thing/Organization/MedicalOrganization/DiagnosticLab/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = BaseComponentProps<
	DiagnosticLabProps,
	"DiagnosticLab",
	ExtractLevelProps<ThingProps, OrganizationProps, MedicalOrganizationProps>
>

export default function DiagnosticLab({
	availableTest,
	schemaType = "DiagnosticLab",
	subtypeProperties = {},
	...props
}): Props {
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
