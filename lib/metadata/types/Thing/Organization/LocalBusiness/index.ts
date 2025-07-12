import type { Text } from "../../../DataType/index.ts"
import type { Place } from "../../Place/index.ts"
import type { Organization } from "../index.ts"

// LocalBusiness interface - extends both Organization and Place
// A particular physical business or branch of an organization.
// Examples include a restaurant, a particular branch of a restaurant chain, a branch of a bank, etc.
export interface LocalBusiness extends Organization, Place {
	currenciesAccepted?: Text
	openingHours?: Text
	paymentAccepted?: Text
	priceRange?: Text
}
