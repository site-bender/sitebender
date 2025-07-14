import { Text } from "../../../../../DataType/index.ts"
import AdministrativeArea from "../../../../Place/AdministrativeArea/index.ts"
import Place from "../../../../Place/index.ts"
import DeliveryMethod from "../../../Enumeration/DeliveryMethod/index.ts"
import GeoShape from "../../GeoShape/index.ts"
import PriceSpecification from "../index.ts"

export default interface DeliveryChargeSpecification
	extends PriceSpecification {
	/** The delivery method(s) to which the delivery charge or payment charge specification applies. */
	appliesToDeliveryMethod?: DeliveryMethod
	/** The geographic area where a service or offered item is provided. */
	areaServed?: AdministrativeArea | Place | GeoShape | Text
	/** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is valid.\n\nSee also [[ineligibleRegion]]. */
	eligibleRegion?: Place | GeoShape | Text
	/** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.\n\nSee also [[eligibleRegion]]. */
	ineligibleRegion?: Place | GeoShape | Text
}
