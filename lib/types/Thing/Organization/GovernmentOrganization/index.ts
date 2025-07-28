import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import GovernmentOrganizationComponent from "../../../../../components/Thing/Organization/GovernmentOrganization/index.tsx"

export interface GovernmentOrganizationProps {
}

type GovernmentOrganization =
	& Thing
	& OrganizationProps
	& GovernmentOrganizationProps

export default GovernmentOrganization
