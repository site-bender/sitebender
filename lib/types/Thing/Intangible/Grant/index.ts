import BioChemEntity from "../../BioChemEntity/index.ts"
import CreativeWork from "../../CreativeWork/index.ts"
import Event from "../../Event/index.ts"
import MedicalEntity from "../../MedicalEntity/index.ts"
import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import Product from "../../Product/index.ts"
import Intangible from "../index.ts"

export default interface Grant extends Intangible {
	/** Indicates something directly or indirectly funded or sponsored through a [[Grant]]. See also [[ownershipFundingInfo]]. */
	fundedItem?:
		| Organization
		| CreativeWork
		| Person
		| Product
		| BioChemEntity
		| MedicalEntity
		| Event
	/** A person or organization that supports (sponsors) something through some kind of financial contribution. */
	funder?: Organization | Person
	/** A person or organization that supports a thing through a pledge, promise, or financial contribution. E.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
	sponsor?: Person | Organization
}
