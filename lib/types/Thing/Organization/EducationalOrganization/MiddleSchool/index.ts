import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { CivicStructureProps } from "../../../Place/CivicStructure/index.ts"
import type { EducationalOrganizationProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import MiddleSchoolComponent from "../../../../../../components/Thing/Organization/EducationalOrganization/MiddleSchool/index.tsx"

export interface MiddleSchoolProps {
}

type MiddleSchool =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& EducationalOrganizationProps
	& OrganizationProps
	& MiddleSchoolProps

export default MiddleSchool
