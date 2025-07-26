import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgramTier from "../MemberProgramTier/index.ts"
import type Organization from "../../Organization/index.ts"

export interface MemberProgramProps {
	hasTiers?: MemberProgramTier
	hostingOrganization?: Organization
}

type MemberProgram =
	& Thing
	& IntangibleProps
	& MemberProgramProps

export default MemberProgram
