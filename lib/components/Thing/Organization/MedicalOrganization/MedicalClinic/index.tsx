import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalClinicProps from "../../../../../types/Thing/MedicalClinic/index.ts"
import type MedicalOrganizationProps from "../../../../../types/Thing/MedicalOrganization/index.ts"

import MedicalOrganization from "./index.tsx"

export type Props = BaseComponentProps<
	MedicalClinicProps,
	"MedicalClinic",
	ExtractLevelProps<MedicalClinicProps, MedicalOrganizationProps>
>

export default function MedicalClinic(
	{
		availableService,
		medicalSpecialty,
		schemaType = "MedicalClinic",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalOrganization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				availableService,
				medicalSpecialty,
				...subtypeProperties,
			}}
		/>
	)
}
