import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { SportsOrganizationProps } from "../index.ts"
import type GenderType from "../../../Intangible/Enumeration/GenderType/index.ts"
import type Person from "../../../Person/index.ts"

import SportsTeamComponent from "../../../../../../components/Thing/Organization/SportsOrganization/SportsTeam/index.tsx"

export interface SportsTeamProps {
	athlete?: Person
	coach?: Person
	gender?: GenderType | Text
}

type SportsTeam =
	& Thing
	& OrganizationProps
	& SportsOrganizationProps
	& SportsTeamProps

export default SportsTeam
