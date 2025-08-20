import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"
import type { FundingAgencyType } from "./FundingAgency/index.ts"
import type { ResearchProjectType } from "./ResearchProject/index.ts"

export type ProjectType = "Project" | ResearchProjectType | FundingAgencyType

export interface ProjectProps {
	"@type"?: ProjectType
}

type Project = Thing & OrganizationProps & ProjectProps

export default Project
