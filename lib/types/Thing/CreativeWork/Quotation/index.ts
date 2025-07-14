import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import CreativeWork from "../index.ts"

export default interface Quotation extends CreativeWork {
	/** The (e.g. fictional) character, Person or Organization to whom the quotation is attributed within the containing CreativeWork. */
	spokenByCharacter?: Organization | Person
}
