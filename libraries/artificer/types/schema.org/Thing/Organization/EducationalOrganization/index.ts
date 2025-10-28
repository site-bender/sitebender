import type Thing from "../../index.ts"
import type { CivicStructureProps } from "../../Place/CivicStructure/index.ts"
import type { PlaceProps } from "../../Place/index.ts"
import type { OrganizationProps } from "../index.ts"
import type { CollegeOrUniversityType } from "./CollegeOrUniversity/index.ts"
import type { ElementarySchoolType } from "./ElementarySchool/index.ts"
import type { HighSchoolType } from "./HighSchool/index.ts"
import type { MiddleSchoolType } from "./MiddleSchool/index.ts"
import type { PreschoolType } from "./Preschool/index.ts"
import type { SchoolType } from "./School/index.ts"

export type EducationalOrganizationType =
	| "EducationalOrganization"
	| PreschoolType
	| ElementarySchoolType
	| MiddleSchoolType
	| HighSchoolType
	| SchoolType
	| CollegeOrUniversityType

export interface EducationalOrganizationProps {
	"@type"?: EducationalOrganizationType
}

type EducationalOrganization =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& OrganizationProps
	& EducationalOrganizationProps

export default EducationalOrganization
