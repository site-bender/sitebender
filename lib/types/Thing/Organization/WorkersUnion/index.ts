import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import WorkersUnionComponent from "../../../../../components/Thing/Organization/WorkersUnion/index.tsx"

export interface WorkersUnionProps {
}

type WorkersUnion =
	& Thing
	& OrganizationProps
	& WorkersUnionProps

export default WorkersUnion
