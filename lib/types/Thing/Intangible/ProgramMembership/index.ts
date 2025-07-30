import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgram from "../MemberProgram/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import MemberProgramComponent from "../../../../components/Thing/Intangible/MemberProgram/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface ProgramMembershipProps {
	"@type"?: "ProgramMembership"
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
