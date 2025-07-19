import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgram from "../MemberProgram/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

export interface ProgramMembershipProps {
	/** The Organization (airline, travelers' club, retailer, etc.) the membership is made with or which offers the  MemberProgram. */
	hostingOrganization?: Organization
	/** A member of an Organization or a ProgramMembership. Organizations can be members of organizations; ProgramMembership is typically for individuals. */
	member?: Organization | Person
	/** A member of this organization. */
	members?: Organization | Person
	/** A unique identifier for the membership. */
	membershipNumber?: Text
	/** The number of membership points earned by the member. If necessary, the unitText can be used to express the units the points are issued in. (E.g. stars, miles, etc.) */
	membershipPointsEarned?: Number | QuantitativeValue
	/** The [MemberProgram](https://schema.org/MemberProgram) associated with a [ProgramMembership](https://schema.org/ProgramMembership). */
	program?: MemberProgram
	/** The program providing the membership. It is preferable to use [:program](https://schema.org/program) instead. */
	programName?: Text
}

type ProgramMembership =
	& Thing
	& IntangibleProps
	& ProgramMembershipProps

export default ProgramMembership
