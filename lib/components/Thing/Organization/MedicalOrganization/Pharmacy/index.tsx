import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalOrganizationProps from "../../../../../types/Thing/MedicalOrganization/index.ts"
import type PharmacyProps from "../../../../../types/Thing/Pharmacy/index.ts"

import MedicalOrganization from "../index.tsx"

// Pharmacy adds no properties to the MedicalOrganization schema type
export type Props = BaseComponentProps<
	PharmacyProps,
	"Pharmacy",
	ExtractLevelProps<PharmacyProps, MedicalOrganizationProps>
>

export default function Pharmacy({
	schemaType = "Pharmacy",
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
