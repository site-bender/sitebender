import { Text } from "../../../../DataType/index.ts"
import Country from "../../../Place/AdministrativeArea/Country/index.ts"
import StructuredValue from "../index.ts"
import PostalCodeRangeSpecification from "../PostalCodeRangeSpecification/index.ts"

export default interface DefinedRegion extends StructuredValue {
	/** The country. Recommended to be in 2-letter [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1) format, for example "US". For backward compatibility, a 3-letter [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) country code such as "SGP" or a full country name such as "Singapore" can also be used. */
	addressCountry?: Text | Country
	/** The region in which the locality is, and which is in the country. For example, California or another appropriate first-level [Administrative division](https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country). */
	addressRegion?: Text
	/** The postal code. For example, 94043. */
	postalCode?: Text
	/** A defined range of postal codes indicated by a common textual prefix. Used for non-numeric systems such as UK. */
	postalCodePrefix?: Text
	/** A defined range of postal codes. */
	postalCodeRange?: PostalCodeRangeSpecification
}
