import type Thing from "../../../index.ts"
import type { CivicStructureProps } from "../../../Place/CivicStructure/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { EducationalOrganizationProps } from "../index.ts"

export type CollegeOrUniversityType = "CollegeOrUniversity"

export interface CollegeOrUniversityProps {
	"@type"?: CollegeOrUniversityType
}

type CollegeOrUniversity =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& EducationalOrganizationProps
	& OrganizationProps
	& CollegeOrUniversityProps

export default CollegeOrUniversity
