import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"

export interface ReturnActionProps {
	recipient?: Audience | ContactPoint | Organization | Person
}

type ReturnAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& ReturnActionProps

export default ReturnAction
