import { Language } from "../../../bcp47/index.ts"
import { Text, URL } from "../../../DataType/index.ts"
import Place from "../../Place/index.ts"
import Intangible from "../index.ts"
import Duration from "../Quantity/Duration/index.ts"
import Service from "../Service/index.ts"
import ContactPoint from "../StructuredValue/ContactPoint/index.ts"
import PostalAddress from "../StructuredValue/ContactPoint/PostalAddress/index.ts"

export default interface ServiceChannel extends Intangible {
	/** A language someone may use with or at the item, service or place. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[inLanguage]]. */
	availableLanguage?: Text | Language
	/** Estimated processing time for the service using this channel. */
	processingTime?: Duration
	/** The service provided by this channel. */
	providesService?: Service
	/** The location (e.g. civic structure, local business, etc.) where a person can go to access the service. */
	serviceLocation?: Place
	/** The phone number to use to access the service. */
	servicePhone?: ContactPoint
	/** The address for accessing the service by mail. */
	servicePostalAddress?: PostalAddress
	/** The number to access the service by text message. */
	serviceSmsNumber?: ContactPoint
	/** The website to access the service. */
	serviceUrl?: URL
}
