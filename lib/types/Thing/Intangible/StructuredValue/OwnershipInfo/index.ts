import type { DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type Product from "../../../Product/index.ts"
import type Service from "../../Service/index.ts"

export interface OwnershipInfoProps {
	acquiredFrom?: Organization | Person
	ownedFrom?: DateTime
	ownedThrough?: DateTime
	typeOfGood?: Product | Service
}

type OwnershipInfo =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& OwnershipInfoProps

export default OwnershipInfo
