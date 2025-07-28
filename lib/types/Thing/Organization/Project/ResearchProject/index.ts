import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { ProjectProps } from "../index.ts"

import ResearchProjectComponent from "../../../../../../components/Thing/Organization/Project/ResearchProject/index.tsx"

export interface ResearchProjectProps {
}

type ResearchProject =
	& Thing
	& OrganizationProps
	& ProjectProps
	& ResearchProjectProps

export default ResearchProject
