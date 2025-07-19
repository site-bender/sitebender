// ResearchProject extends Project but adds no additional properties
import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { ProjectProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ResearchProjectProps {}

type ResearchProject =
	& Thing
	& OrganizationProps
	& ProjectProps
	& ResearchProjectProps

export default ResearchProject
