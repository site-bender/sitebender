import type { Boolean, Date, Text } from "../../DataType/index.ts"
import type {
	AdultOrientedEnumeration,
	AggregateRating,
	CategoryCode,
	Certification,
	Country,
	Demand,
	Distance,
	EnergyConsumptionDetails,
	ImageObject,
	ItemList,
	ListItem,
	MerchantReturnPolicy,
	Offer,
	OfferItemCondition,
	PhysicalActivityCategory,
	ProductModel,
	ProductReturnPolicy,
	PropertyValue,
	QuantitativeValue,
	Review,
	Service,
	SizeSpecification,
	Thing,
	URL,
	WebContent,
} from "../index.ts"
import type { Audience } from "../Intangible/Audience/index.ts"
import type { Brand } from "../Intangible/Brand/index.ts"
import type { DefinedTerm } from "../Intangible/DefinedTerm/index.ts"
import type { Organization } from "../Organization/index.ts"

// Product interface - extends Thing
export interface Product extends Thing {
	additionalProperty?: PropertyValue
	aggregateRating?: AggregateRating
	asin?: Text | URL
	audience?: Audience
	award?: Text
	brand?: Brand | Organization
	category?: CategoryCode | PhysicalActivityCategory | Text | Thing | URL
	color?: Text
	countryOfAssembly?: Country
	countryOfLastProcessing?: Country
	countryOfOrigin?: Country
	depth?: Distance | QuantitativeValue
	gtin?: Text
	gtin12?: Text
	gtin13?: Text
	gtin14?: Text
	gtin8?: Text
	hasAdultConsideration?: AdultOrientedEnumeration
	hasCertification?: Certification
	hasEnergyConsumptionDetails?: EnergyConsumptionDetails
	hasGS1DigitalLink?: URL
	hasMeasurement?: QuantitativeValue
	hasMerchantReturnPolicy?: MerchantReturnPolicy
	hasProductReturnPolicy?: ProductReturnPolicy
	height?: Distance | QuantitativeValue
	inProductGroupWithID?: Text
	isAccessoryOrSparePartFor?: Product
	isConsumableFor?: Product
	isFamilyFriendly?: Boolean
	isRelatedTo?: Product | Service
	isSimilarTo?: Product | Service
	itemCondition?: OfferItemCondition
	keywords?: DefinedTerm | Text | URL
	logo?: ImageObject | URL
	manufacturer?: Organization
	material?: Product | Text | URL
	mobileUrl?: URL
	model?: ProductModel | Text
	mpn?: Text
	negativeNotes?: ItemList | ListItem | Text | WebContent
	nsn?: Text
	offers?: Demand | Offer
	pattern?: DefinedTerm | Text
	positiveNotes?: ItemList | ListItem | Text | WebContent
	productID?: Text
	productionDate?: Date
	purchaseDate?: Date
	releaseDate?: Date
	review?: Review
	size?: DefinedTerm | QuantitativeValue | SizeSpecification | Text
	sku?: Text
	slogan?: Text
	weight?: QuantitativeValue
	width?: Distance | QuantitativeValue
}
