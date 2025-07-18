import type { Text } from "../../../../../DataType/index.ts"
import type Country from "../../../../Place/AdministrativeArea/Country/index.ts"
import type ContactPoint from "../index.ts"

export default interface PostalAddress extends ContactPoint {
	/** The country. Recommended to be in 2-letter [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1) format, for example "US". For backward compatibility, a 3-letter [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) country code such as "SGP" or a full country name such as "Singapore" can also be used. */
	addressCountry?: Text | Country
	/** The locality in which the street address is, and which is in the region. For example, Mountain View. */
	addressLocality?: Text
	/** The region in which the locality is, and which is in the country. For example, California or another appropriate first-level [Administrative division](https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country). */
	addressRegion?: Text
	/** An address extension such as an apartment number, C/O or alternative name. */
	extendedAddress?: Text
	/** The post office box number for PO box addresses. */
	postOfficeBoxNumber?: Text
	/** The postal code. For example, 94043. */
	postalCode?: Text
	/** The street address. For example, 1600 Amphitheatre Pkwy. */
	streetAddress?: Text
}
