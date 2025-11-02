import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgram from "../MemberProgram/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import MemberProgramComponent from "../../../../../src/define/Thing/Intangible/MemberProgram/index.tsx"
import QuantitativeValueComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import OrganizationComponent from "../../../../../src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../src/define/Thing/Person/index.tsx"

export type ProgramMembershipType = "ProgramMembership"

export interface ProgramMembershipProps {
	"@type"?: ProgramMembershipType
	hostingOrganization?:
		| Organization
		| ReturnType<typeof OrganizationComponent>
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
