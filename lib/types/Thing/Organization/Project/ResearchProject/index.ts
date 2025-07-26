import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { ProjectProps } from "../index.ts"

export interface ResearchProjectProps {
}

type ResearchProject =
	& Thing
	& OrganizationProps
	& ProjectProps
	& ResearchProjectProps

export default ResearchProject
