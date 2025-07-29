import type BaseProps from "../../../../types/index.ts"
import type ProgramMembershipProps from "../../../../types/Thing/Intangible/ProgramMembership/index.ts"

import Intangible from "../index.tsx"

export type Props = ProgramMembershipProps & BaseProps

export default function ProgramMembership({
	hostingOrganization,
	member,
	members,
	membershipNumber,
	membershipPointsEarned,
	program,
	programName,
	_type = "ProgramMembership",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
