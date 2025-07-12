import type { Text } from "../../../DataType/index.ts"
import type {
	Country,
	Duration,
	MusicGroup,
	PerformingGroup,
	VideoObject,
} from "../../index.ts"
import type { QuantitativeValue } from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { Organization } from "../../Organization/index.ts"
import type { Person } from "../../Person/index.ts"
import type { CreativeWork } from "../index.ts"

// Movie interface - extends CreativeWork
// A movie.
export interface Movie extends CreativeWork {
	actor?: PerformingGroup | Person
	countryOfOrigin?: Country
	director?: Person
	duration?: Duration | QuantitativeValue
	musicBy?: MusicGroup | Person
	productionCompany?: Organization
	subtitle?: Text
	trailer?: VideoObject
}
