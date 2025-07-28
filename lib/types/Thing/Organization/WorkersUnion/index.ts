import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface WorkersUnionProps {}

type WorkersUnion = Thing & OrganizationProps & WorkersUnionProps

export default WorkersUnion
