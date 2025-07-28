import type Thing from "../../../index.ts"
import type { CivicStructureProps } from "../../../Place/CivicStructure/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { EducationalOrganizationProps } from "../index.ts"

export interface ElementarySchoolProps {}

type ElementarySchool =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& EducationalOrganizationProps
	& OrganizationProps
	& ElementarySchoolProps

export default ElementarySchool
