import type Thing from "../../index.ts"
import type Person from "../../Person/index.ts"
import type CivicStructure from "../../Place/CivicStructure/index.ts"
import type { CivicStructureProps } from "../../Place/CivicStructure/index.ts"
import type Organization from "../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface EducationalOrganizationProps {
	/** Alumni of an organization. */
	alumni?: Person
}

type EducationalOrganization =
	& Thing
	& OrganizationProps
	& CivicStructureProps
	& EducationalOrganizationProps

export default EducationalOrganization
