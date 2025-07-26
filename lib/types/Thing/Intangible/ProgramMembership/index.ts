import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgram from "../MemberProgram/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

export interface ProgramMembershipProps {
	hostingOrganization?: Organization
	member?: Organization | Person
	members?: Organization | Person
	membershipNumber?: Text
	membershipPointsEarned?: Number | QuantitativeValue
	program?: MemberProgram
	programName?: Text
}

type ProgramMembership =
	& Thing
	& IntangibleProps
	& ProgramMembershipProps

export default ProgramMembership
