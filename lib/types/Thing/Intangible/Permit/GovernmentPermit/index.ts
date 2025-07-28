import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { PermitProps } from "../index.ts"

export interface GovernmentPermitProps {}

type GovernmentPermit =
	& Thing
	& IntangibleProps
	& PermitProps
	& GovernmentPermitProps

export default GovernmentPermit
