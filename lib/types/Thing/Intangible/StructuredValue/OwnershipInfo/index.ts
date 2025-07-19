import type { DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type Product from "../../../Product/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Service from "../../Service/index.ts"
import type { StructuredValueProps } from "../index.ts"

export interface OwnershipInfoProps {
	/** The organization or person from which the product was acquired. */
	acquiredFrom?: Person | Organization
	/** The date and time of obtaining the product. */
	ownedFrom?: DateTime
	/** The date and time of giving up ownership on the product. */
	ownedThrough?: DateTime
	/** The product that this structured value is referring to. */
	typeOfGood?: Product | Service
}

type OwnershipInfo =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& OwnershipInfoProps

export default OwnershipInfo
