import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { CivicStructureProps } from "../../../Place/CivicStructure/index.ts"
import type { EducationalOrganizationProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import HighSchoolComponent from "../../../../../../components/Thing/Organization/EducationalOrganization/HighSchool/index.tsx"

export interface HighSchoolProps {
}

type HighSchool =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& EducationalOrganizationProps
	& OrganizationProps
	& HighSchoolProps

export default HighSchool
