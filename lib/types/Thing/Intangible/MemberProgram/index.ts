import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgramTier from "../MemberProgramTier/index.ts"

import MemberProgramTierComponent from "../../../../components/Thing/Intangible/MemberProgramTier/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"

export type MemberProgramType = "MemberProgram"

export interface MemberProgramProps {
	"@type"?: MemberProgramType
	hasTiers?: MemberProgramTier | ReturnType<typeof MemberProgramTierComponent>
	hostingOrganization?: Organization | ReturnType<typeof OrganizationComponent>
}

type MemberProgram = Thing & IntangibleProps & MemberProgramProps

export default MemberProgram
