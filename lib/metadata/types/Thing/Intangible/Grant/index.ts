import type { BioChemEntity, MedicalEntity } from "../../index.ts"
import type { CreativeWork } from "../../CreativeWork/index.ts"
import type { Event } from "../../Event/index.ts"
import type { Organization } from "../../Organization/index.ts"
import type { Person } from "../../Person/index.ts"
import type { Product } from "../../Product/index.ts"
import type { Intangible } from "../index.ts"

// Grant interface - extends Intangible
// A grant, typically financial or otherwise quantifiable, of resources.
// Typically a funder sponsors some MonetaryAmount to an Organization or Person,
// sometimes not necessarily via a dedicated or long-lived Project, resulting in one or more outputs, or fundedItems.
export interface Grant extends Intangible {
	fundedItem?:
		| BioChemEntity
		| CreativeWork
		| Event
		| MedicalEntity
		| Organization
		| Person
		| Product
	funder?: Organization | Person
	sponsor?: Organization | Person
}
