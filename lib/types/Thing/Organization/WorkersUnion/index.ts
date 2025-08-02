import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type WorkersUnionType = "WorkersUnion"

export interface WorkersUnionProps {
	"@type"?: WorkersUnionType
}

type WorkersUnion = Thing & OrganizationProps & WorkersUnionProps

export default WorkersUnion
