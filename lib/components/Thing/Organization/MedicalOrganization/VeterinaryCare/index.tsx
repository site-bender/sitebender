import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalOrganizationProps from "../../../../../types/Thing/MedicalOrganization/index.ts"
import type VeterinaryCareProps from "../../../../../types/Thing/VeterinaryCare/index.ts"

import MedicalOrganization from "./index.tsx"

// VeterinaryCare adds no properties to the MedicalOrganization schema type
export type Props = BaseComponentProps<
	VeterinaryCareProps,
	"VeterinaryCare",
	ExtractLevelProps<VeterinaryCareProps, MedicalOrganizationProps>
>

export default function VeterinaryCare({
	schemaType = "VeterinaryCare",
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
