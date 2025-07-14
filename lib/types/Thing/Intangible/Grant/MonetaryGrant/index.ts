import { Number } from "../../../../DataType/index.ts"
import Organization from "../../../Organization/index.ts"
import Person from "../../../Person/index.ts"
import MonetaryAmount from "../../StructuredValue/MonetaryAmount/index.ts"
import Grant from "../index.ts"

export default interface MonetaryGrant extends Grant {
	/** The amount of money. */
	amount?: Number | MonetaryAmount
	/** A person or organization that supports (sponsors) something through some kind of financial contribution. */
	funder?: Organization | Person
}
