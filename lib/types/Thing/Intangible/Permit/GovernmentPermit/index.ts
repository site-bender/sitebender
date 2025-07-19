// GovernmentPermit extends Permit but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { PermitProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface GovernmentPermitProps {}

type GovernmentPermit =
	& Thing
	& IntangibleProps
	& PermitProps
	& GovernmentPermitProps

export default GovernmentPermit
