import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"
import type { SportsTeamType } from "./SportsTeam/index.ts"

export type SportsOrganizationType = "SportsOrganization" | SportsTeamType

export interface SportsOrganizationProps {
	"@type"?: SportsOrganizationType
	sport?: Text | URL
}

type SportsOrganization = Thing & OrganizationProps & SportsOrganizationProps

export default SportsOrganization
