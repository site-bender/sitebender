import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import ResearchOrganizationComponent from "../../../../../components/Thing/Organization/ResearchOrganization/index.tsx"

export interface ResearchOrganizationProps {
}

type ResearchOrganization =
	& Thing
	& OrganizationProps
	& ResearchOrganizationProps

export default ResearchOrganization
