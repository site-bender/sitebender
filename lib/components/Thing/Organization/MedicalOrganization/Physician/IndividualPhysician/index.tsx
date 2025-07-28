import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../../../types/Thing/Organization/index.ts"
import type { MedicalOrganizationProps } from "../../../../../../types/Thing/Organization/MedicalOrganization/index.ts"
import type { PhysicianProps } from "../../../../../../types/Thing/Organization/MedicalOrganization/Physician/index.ts"
import type { IndividualPhysicianProps } from "../../../../../../types/Thing/Organization/MedicalOrganization/Physician/IndividualPhysician/index.ts"

import Physician from "../index.tsx"

export type Props = BaseComponentProps<
	IndividualPhysicianProps,
	"IndividualPhysician",
	ExtractLevelProps<ThingProps, OrganizationProps, MedicalOrganizationProps, PhysicianProps>
>

export default function IndividualPhysician({
	practicesAt,
	schemaType = "IndividualPhysician",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Physician
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				practicesAt,
				...subtypeProperties,
			}}
		/>
	)
}
