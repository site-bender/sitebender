import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalOrganizationProps from "../../../../../types/Thing/MedicalOrganization/index.ts"
import type PhysicianProps from "../../../../../types/Thing/Physician/index.ts"

import MedicalOrganization from "./index.tsx"

export type Props = BaseComponentProps<
	PhysicianProps,
	"Physician",
	ExtractLevelProps<PhysicianProps, MedicalOrganizationProps>
>

export default function Physician(
	{
		availableService,
		hospitalAffiliation,
		medicalSpecialty,
		occupationalCategory,
		usNPI,
		schemaType = "Physician",
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
				hospitalAffiliation,
				medicalSpecialty,
				occupationalCategory,
				usNPI,
				...subtypeProperties,
			}}
		/>
	)
}
