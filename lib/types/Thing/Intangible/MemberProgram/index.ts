import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgramTier from "../MemberProgramTier/index.ts"
import type Organization from "../../Organization/index.ts"

import MemberProgramComponent from "../../../../../components/Thing/Intangible/MemberProgram/index.tsx"

export interface MemberProgramProps {
	hasTiers?: MemberProgramTier
	hostingOrganization?: Organization
}

type MemberProgram =
	& Thing
	& IntangibleProps
	& MemberProgramProps

export default MemberProgram
