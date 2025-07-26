import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { CivicStructureProps } from "../../../Place/CivicStructure/index.ts"
import type { EducationalOrganizationProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

export interface PreschoolProps {
}

type Preschool =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& EducationalOrganizationProps
	& OrganizationProps
	& PreschoolProps

export default Preschool
