import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgram from "../MemberProgram/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import { MemberProgram as MemberProgramComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"

export type ProgramMembershipType = "ProgramMembership"

export interface ProgramMembershipProps {
	"@type"?: ProgramMembershipType
	hostingOrganization?: Organization | ReturnType<typeof OrganizationComponent>
	member?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	members?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	membershipNumber?: Text
	membershipPointsEarned?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	program?: MemberProgram | ReturnType<typeof MemberProgramComponent>
	programName?: Text
}

type ProgramMembership = Thing & IntangibleProps & ProgramMembershipProps

export default ProgramMembership
