// HighSchool extends EducationalOrganization but adds no additional properties
import type Thing from "../../../index.ts"
import type { EducationalOrganizationProps } from "../../../Place/CivicStructure/EducationalOrganization/index.ts"
import type { CivicStructureProps } from "../../../Place/CivicStructure/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"

// deno-lint-ignore no-empty-interface
export interface HighSchoolProps {}

type HighSchool =
	& Thing
	& CivicStructureProps
	& EducationalOrganizationProps
	& PlaceProps
	& HighSchoolProps

export default HighSchool
