import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"

export default interface Quotation extends CreativeWork {
	/** The (e.g. fictional) character, Person or Organization to whom the quotation is attributed within the containing CreativeWork. */
	spokenByCharacter?: Organization | Person
}
