import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type ResearchOrganizationType = "ResearchOrganization"

export interface ResearchOrganizationProps {
	"@type"?: ResearchOrganizationType
}

type ResearchOrganization =
	& Thing
	& OrganizationProps
	& ResearchOrganizationProps

export default ResearchOrganization
