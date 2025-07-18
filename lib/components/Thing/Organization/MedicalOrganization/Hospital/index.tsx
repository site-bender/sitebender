import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type HospitalProps from "../../../../../types/Thing/Hospital/index.ts"
import type MedicalOrganizationProps from "../../../../../types/Thing/MedicalOrganization/index.ts"

import MedicalOrganization from "../index.tsx"

export type Props = BaseComponentProps<
	HospitalProps,
	"Hospital",
	ExtractLevelProps<HospitalProps, MedicalOrganizationProps>
>

export default function Hospital(
	{
		availableService,
		healthcareReportingData,
		medicalSpecialty,
		schemaType = "Hospital",
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
				healthcareReportingData,
				medicalSpecialty,
				...subtypeProperties,
			}}
		/>
	)
}
