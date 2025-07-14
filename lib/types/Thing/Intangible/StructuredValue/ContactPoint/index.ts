import { Language } from "../../../../bcp47/index.ts"
import { Text } from "../../../../DataType/index.ts"
import AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import Place from "../../../Place/index.ts"
import Product from "../../../Product/index.ts"
import ContactPointOption from "../../Enumeration/ContactPointOption/index.ts"
import GeoShape from "../GeoShape/index.ts"
import StructuredValue from "../index.ts"
import OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"

export default interface ContactPoint extends StructuredValue {
	/** The geographic area where a service or offered item is provided. */
	areaServed?: AdministrativeArea | Place | GeoShape | Text
	/** A language someone may use with or at the item, service or place. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[inLanguage]]. */
	availableLanguage?: Text | Language
	/** An option available on this contact point (e.g. a toll-free number or support for hearing-impaired callers). */
	contactOption?: ContactPointOption
	/** A person or organization can have different contact points, for different purposes. For example, a sales contact point, a PR contact point and so on. This property is used to specify the kind of contact point. */
	contactType?: Text
	/** Email address. */
	email?: Text
	/** The fax number. */
	faxNumber?: Text
	/** The hours during which this service or contact is available. */
	hoursAvailable?: OpeningHoursSpecification
	/** The product or service this support contact point is related to (such as product support for a particular product line). This can be a specific product or product line (e.g. "iPhone") or a general category of products or services (e.g. "smartphones"). */
	productSupported?: Text | Product
	/** The geographic area where the service is provided. */
	serviceArea?: Place | AdministrativeArea | GeoShape
	/** The telephone number. */
	telephone?: Text
}
