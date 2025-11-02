import type Thing from "../../../index.ts"
import type { CivicStructureProps } from "../../../Place/CivicStructure/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { EducationalOrganizationProps } from "../index.ts"

export type ElementarySchoolType = "ElementarySchool"

export interface ElementarySchoolProps {
	"@type"?: ElementarySchoolType
}

type ElementarySchool =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& EducationalOrganizationProps
	& OrganizationProps
	& ElementarySchoolProps

export default ElementarySchool
