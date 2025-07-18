import type {
	Date,
	DateTime,
	Text,
	Time,
	URL,
} from "../../../DataType/index.ts"
import type CreativeWork from "../../CreativeWork/index.ts"
import type Event from "../../Event/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Place from "../../Place/index.ts"
import type Product from "../../Product/index.ts"
import type BusinessEntityType from "../Enumeration/BusinessEntityType/index.ts"
import type BusinessFunction from "../Enumeration/BusinessFunction/index.ts"
import type DeliveryMethod from "../Enumeration/DeliveryMethod/index.ts"
import type ItemAvailability from "../Enumeration/ItemAvailability/index.ts"
import type OfferItemCondition from "../Enumeration/OfferItemCondition/index.ts"
import type Intangible from "../index.ts"
import type MenuItem from "../MenuItem/index.ts"
import type AggregateOffer from "../Offer/AggregateOffer/index.ts"
import type PaymentMethod from "../PaymentMethod/index.ts"
import type LoanOrCredit from "../Service/FinancialProduct/LoanOrCredit/index.ts"
import type Service from "../Service/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"
import type TypeAndQuantityNode from "../StructuredValue/TypeAndQuantityNode/index.ts"
import type WarrantyPromise from "../StructuredValue/WarrantyPromise/index.ts"
import type Trip from "../Trip/index.ts"

export default interface Demand extends Intangible {
	/** The payment method(s) that are accepted in general by an organization, or for some specific demand or offer. */
	acceptedPaymentMethod?: LoanOrCredit | Text | PaymentMethod
	/** The amount of time that is required between accepting the offer and the actual usage of the resource or service. */
	advanceBookingRequirement?: QuantitativeValue
	/** The geographic area where a service or offered item is provided. */
	areaServed?: AdministrativeArea | Place | GeoShape | Text
	/** An Amazon Standard Identification Number (ASIN) is a 10-character alphanumeric unique identifier assigned by Amazon.com and its partners for product identification within the Amazon organization (summary from [Wikipedia](https://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number)'s article).  Note also that this is a definition for how to include ASINs in Schema.org data, and not a definition of ASINs in general - see documentation from Amazon for authoritative details. ASINs are most commonly encoded as text strings, but the [asin] property supports URL/URI as potential values too. */
	asin?: Text | URL
	/** The availability of this item&#x2014;for example In stock, Out of stock, Pre-order, etc. */
	availability?: ItemAvailability
	/** The end of the availability of the product or service included in the offer. */
	availabilityEnds?: Date | DateTime | Time
	/** The beginning of the availability of the product or service included in the offer. */
	availabilityStarts?: Date | Time | DateTime
	/** The place(s) from which the offer can be obtained (e.g. store locations). */
	availableAtOrFrom?: Place
	/** The delivery method(s) available for this offer. */
	availableDeliveryMethod?: DeliveryMethod
	/** The business function (e.g. sell, lease, repair, dispose) of the offer or component of a bundle (TypeAndQuantityNode). The default is http://purl.org/goodrelations/v1#Sell. */
	businessFunction?: BusinessFunction
	/** The typical delay between the receipt of the order and the goods either leaving the warehouse or being prepared for pickup, in case the delivery method is on site pickup. */
	deliveryLeadTime?: QuantitativeValue
	/** The type(s) of customers for which the given offer is valid. */
	eligibleCustomerType?: BusinessEntityType
	/** The duration for which the given offer is valid. */
	eligibleDuration?: QuantitativeValue
	/** The interval and unit of measurement of ordering quantities for which the offer or price specification is valid. This allows e.g. specifying that a certain freight charge is valid only for a certain quantity. */
	eligibleQuantity?: QuantitativeValue
	/** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is valid.\n\nSee also [[ineligibleRegion]]. */
	eligibleRegion?: Place | GeoShape | Text
	/** The transaction volume, in a monetary unit, for which the offer or price specification is valid, e.g. for indicating a minimal purchasing volume, to express free shipping above a certain order volume, or to limit the acceptance of credit cards to purchases to a certain minimal amount. */
	eligibleTransactionVolume?: PriceSpecification
	/** A Global Trade Item Number ([GTIN](https://www.gs1.org/standards/id-keys/gtin)). GTINs identify trade items, including products and services, using numeric identification codes.  A correct [[gtin]] value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a [valid GS1 check digit](https://www.gs1.org/services/check-digit-calculator) and meet the other rules for valid GTINs. See also [GS1's GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) and [Wikipedia](https://en.wikipedia.org/wiki/Global_Trade_Item_Number) for more details. Left-padding of the gtin values is not required or encouraged. The [[gtin]] property generalizes the earlier [[gtin8]], [[gtin12]], [[gtin13]], and [[gtin14]] properties.  The GS1 [digital link specifications](https://www.gs1.org/standards/Digital-Link/) expresses GTINs as URLs (URIs, IRIs, etc.). Digital Links should be populated into the [[hasGS1DigitalLink]] attribute.  Note also that this is a definition for how to include GTINs in Schema.org data, and not a definition of GTINs in general - see the GS1 documentation for authoritative details. */
	gtin?: Text | URL
	/** The GTIN-12 code of the product, or the product to which the offer refers. The GTIN-12 is the 12-digit GS1 Identification Key composed of a U.P.C. Company Prefix, Item Reference, and Check Digit used to identify trade items. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
	gtin12?: Text
	/** The GTIN-13 code of the product, or the product to which the offer refers. This is equivalent to 13-digit ISBN codes and EAN UCC-13. Former 12-digit UPC codes can be converted into a GTIN-13 code by simply adding a preceding zero. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
	gtin13?: Text
	/** The GTIN-14 code of the product, or the product to which the offer refers. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
	gtin14?: Text
	/** The GTIN-8 code of the product, or the product to which the offer refers. This code is also known as EAN/UCC-8 or 8-digit EAN. See [GS1 GTIN Summary](http://www.gs1.org/barcodes/technical/idkeys/gtin) for more details. */
	gtin8?: Text
	/** This links to a node or nodes indicating the exact quantity of the products included in  an [[Offer]] or [[ProductCollection]]. */
	includesObject?: TypeAndQuantityNode
	/** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.\n\nSee also [[eligibleRegion]]. */
	ineligibleRegion?: Place | GeoShape | Text
	/** The current approximate inventory level for the item or items. */
	inventoryLevel?: QuantitativeValue
	/** A predefined value from OfferItemCondition specifying the condition of the product or service, or the products or services included in the offer. Also used for product return policies to specify the condition of products accepted for returns. */
	itemCondition?: OfferItemCondition
	/** An item being offered (or demanded). The transactional nature of the offer or demand is documented using [[businessFunction]], e.g. sell, lease etc. While several common expected types are listed explicitly in this definition, others can be used. Using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
	itemOffered?:
		| Service
		| AggregateOffer
		| CreativeWork
		| Event
		| MenuItem
		| Product
		| Trip
	/** The Manufacturer Part Number (MPN) of the product, or the product to which the offer refers. */
	mpn?: Text
	/** One or more detailed price specifications, indicating the unit price and delivery or payment charges. */
	priceSpecification?: PriceSpecification
	/** An entity which offers (sells / leases / lends / loans) the services / goods.  A seller may also be a provider. */
	seller?: Organization | Person
	/** The serial number or any alphanumeric identifier of a particular product. When attached to an offer, it is a shortcut for the serial number of the product included in the offer. */
	serialNumber?: Text
	/** The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a product or service, or the product to which the offer refers. */
	sku?: Text
	/** The date when the item becomes valid. */
	validFrom?: Date | DateTime
	/** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
	validThrough?: Date | DateTime
	/** The warranty promise(s) included in the offer. */
	warranty?: WarrantyPromise
}
