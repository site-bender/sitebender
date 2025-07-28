import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { ProgramMembershipProps } from "../../../../types/Thing/Intangible/ProgramMembership/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	ProgramMembershipProps,
	"ProgramMembership",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function ProgramMembership({
	hostingOrganization,
	member,
	members,
	membershipNumber,
	membershipPointsEarned,
	program,
	programName,
	schemaType = "ProgramMembership",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hostingOrganization,
				member,
				members,
				membershipNumber,
				membershipPointsEarned,
				program,
				programName,
				...subtypeProperties,
			}}
		/>
	)
}
