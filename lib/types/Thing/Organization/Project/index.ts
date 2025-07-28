import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import ProjectComponent from "../../../../../components/Thing/Organization/Project/index.tsx"

export interface ProjectProps {
}

type Project =
	& Thing
	& OrganizationProps
	& ProjectProps

export default Project
