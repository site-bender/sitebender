import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgramTier from "../MemberProgramTier/index.ts"

export interface MemberProgramProps {
	/** The tiers of a member program. */
	hasTiers?: MemberProgramTier
	/** The Organization (airline, travelers' club, retailer, etc.) the membership is made with or which offers the  MemberProgram. */
	hostingOrganization?: Organization
}

type MemberProgram =
	& Thing
	& IntangibleProps
	& MemberProgramProps

export default MemberProgram
