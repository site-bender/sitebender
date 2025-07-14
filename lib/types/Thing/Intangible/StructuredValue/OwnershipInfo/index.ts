import { DateTime } from "../../../../DataType/index.ts"
import Organization from "../../../Organization/index.ts"
import Person from "../../../Person/index.ts"
import Product from "../../../Product/index.ts"
import Service from "../../Service/index.ts"
import StructuredValue from "../index.ts"

export default interface OwnershipInfo extends StructuredValue {
	/** The organization or person from which the product was acquired. */
	acquiredFrom?: Person | Organization
	/** The date and time of obtaining the product. */
	ownedFrom?: DateTime
	/** The date and time of giving up ownership on the product. */
	ownedThrough?: DateTime
	/** The product that this structured value is referring to. */
	typeOfGood?: Product | Service
}
