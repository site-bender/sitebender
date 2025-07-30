import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface ResearchOrganizationProps {
	"@type"?: "ResearchOrganization"}

type ResearchOrganization =
	& Thing
	& OrganizationProps
	& ResearchOrganizationProps

export default ResearchOrganization
