import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DentistProps from "../../../../../types/Thing/Dentist/index.ts"
import type MedicalOrganizationProps from "../../../../../types/Thing/MedicalOrganization/index.ts"

import MedicalOrganization from "./index.tsx"

// Dentist adds no properties to the MedicalOrganization schema type
export type Props = BaseComponentProps<
	DentistProps,
	"Dentist",
	ExtractLevelProps<DentistProps, MedicalOrganizationProps>
>

export default function Dentist({
	schemaType = "Dentist",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalOrganization
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
