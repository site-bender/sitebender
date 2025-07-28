import type { Boolean, Date, Text, URL } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type AdultOrientedEnumeration from "../Intangible/Enumeration/AdultOrientedEnumeration/index.ts"
import type AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import type Audience from "../Intangible/Audience/index.ts"
import type Brand from "../Intangible/Brand/index.ts"
import type CategoryCode from "../Intangible/DefinedTerm/CategoryCode/index.ts"
import type Certification from "../CreativeWork/Certification/index.ts"
import type Country from "../Place/AdministrativeArea/Country/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Demand from "../Intangible/Demand/index.ts"
import type Distance from "../Intangible/Quantity/Distance/index.ts"
import type EnergyConsumptionDetails from "../Intangible/EnergyConsumptionDetails/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type ImageObject from "../CreativeWork/MediaObject/ImageObject/index.ts"
import type ItemList from "../Intangible/ItemList/index.ts"
import type ListItem from "../Intangible/ListItem/index.ts"
import type Mass from "../Intangible/Quantity/Mass/index.ts"
import type MerchantReturnPolicy from "../Intangible/MerchantReturnPolicy/index.ts"
import type Offer from "../Intangible/Offer/index.ts"
import type OfferItemCondition from "../Intangible/Enumeration/OfferItemCondition/index.ts"
import type Organization from "../Organization/index.ts"
import type PhysicalActivityCategory from "../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type ProductGroup from "./ProductGroup/index.ts"
import type ProductModel from "./ProductModel/index.ts"
import type PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Review from "../CreativeWork/Review/index.ts"
import type Service from "../Intangible/Service/index.ts"
import type SizeSpecification from "../Intangible/Enumeration/QualitativeValue/SizeSpecification/index.ts"
import type WebContent from "../CreativeWork/WebContent/index.ts"

import ProductComponent from "../../../../components/Thing/Product/index.tsx"

export interface ProductProps {
	additionalProperty?: PropertyValue
	aggregateRating?: AggregateRating
	asin?: Text | URL
	audience?: Audience
	award?: Text
	awards?: Text
	brand?: Brand | Organization
	category?: CategoryCode | PhysicalActivityCategory | Text | Thing | URL
	color?: Text
	colorSwatch?: ImageObject | URL
	countryOfAssembly?: Text
	countryOfLastProcessing?: Text
	countryOfOrigin?: Country
	depth?: Distance | QuantitativeValue
	funding?: Grant
	gtin?: Text | URL
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
	hasProductReturnPolicy?: MerchantReturnPolicy
	height?: Distance | QuantitativeValue
	inProductGroupWithID?: Text
	isAccessoryOrSparePartFor?: Product
	isConsumableFor?: Product
	isFamilyFriendly?: Boolean
	isRelatedTo?: Product | Service
	isSimilarTo?: Product | Service
	isVariantOf?: ProductGroup | ProductModel
	itemCondition?: OfferItemCondition
	keywords?: DefinedTerm | Text | URL
	logo?: ImageObject | URL
	manufacturer?: Organization
	material?: Product | Text | URL
	mobileUrl?: Text
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
	reviews?: Review
	size?: DefinedTerm | QuantitativeValue | SizeSpecification | Text
	sku?: Text
	slogan?: Text
	weight?: Mass | QuantitativeValue
	width?: Distance | QuantitativeValue
}

type Product =
	& Thing
	& ProductProps

export default Product
