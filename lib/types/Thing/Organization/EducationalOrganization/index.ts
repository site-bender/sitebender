import type Thing from "../../index.ts"
import type { PlaceProps } from "../../Place/index.ts"
import type { CivicStructureProps } from "../../Place/CivicStructure/index.ts"
import type { OrganizationProps } from "../index.ts"

import EducationalOrganizationComponent from "../../../../../components/Thing/Organization/EducationalOrganization/index.tsx"

export interface EducationalOrganizationProps {
}

type EducationalOrganization =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& OrganizationProps
	& EducationalOrganizationProps

export default EducationalOrganization
