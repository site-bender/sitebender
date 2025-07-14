import Organization from "../../Organization/index.ts"
import Intangible from "../index.ts"
import MemberProgramTier from "../MemberProgramTier/index.ts"

export default interface MemberProgram extends Intangible {
	/** The tiers of a member program. */
	hasTiers?: MemberProgramTier
	/** The Organization (airline, travelers' club, retailer, etc.) the membership is made with or which offers the  MemberProgram. */
	hostingOrganization?: Organization
}
