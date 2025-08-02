import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { ProjectProps } from "../index.ts"

export type ResearchProjectType = "ResearchProject"

export interface ResearchProjectProps {
	"@type"?: ResearchProjectType
}

type ResearchProject =
	& Thing
	& OrganizationProps
	& ProjectProps
	& ResearchProjectProps

export default ResearchProject
