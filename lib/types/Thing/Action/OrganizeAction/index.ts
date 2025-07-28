import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface OrganizeActionProps {}

type OrganizeAction = Thing & ActionProps & OrganizeActionProps

export default OrganizeAction
