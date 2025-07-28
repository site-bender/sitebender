import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { PermitProps } from "../index.ts"

import GovernmentPermitComponent from "../../../../../../components/Thing/Intangible/Permit/GovernmentPermit/index.tsx"

export interface GovernmentPermitProps {
}

type GovernmentPermit =
	& Thing
	& IntangibleProps
	& PermitProps
	& GovernmentPermitProps

export default GovernmentPermit
