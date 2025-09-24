import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { PermitProps } from "../index.ts"

export type GovernmentPermitType = "GovernmentPermit"

export interface GovernmentPermitProps {
	"@type"?: GovernmentPermitType
}

type GovernmentPermit =
	& Thing
	& IntangibleProps
	& PermitProps
	& GovernmentPermitProps

export default GovernmentPermit
