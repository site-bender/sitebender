import type { Boolean, Date, Text, URL } from "../../DataType/index.ts"
import type Certification from "../CreativeWork/Certification/index.ts"
import type ImageObject from "../CreativeWork/MediaObject/ImageObject/index.ts"
import type Review from "../CreativeWork/Review/index.ts"
import type WebContent from "../CreativeWork/WebContent/index.ts"
import type Thing from "../index.ts"
import type Audience from "../Intangible/Audience/index.ts"
import type Brand from "../Intangible/Brand/index.ts"
import type CategoryCode from "../Intangible/DefinedTerm/CategoryCode/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Demand from "../Intangible/Demand/index.ts"
import type EnergyConsumptionDetails from "../Intangible/EnergyConsumptionDetails/index.ts"
import type AdultOrientedEnumeration from "../Intangible/Enumeration/AdultOrientedEnumeration/index.ts"
import type OfferItemCondition from "../Intangible/Enumeration/OfferItemCondition/index.ts"
import type PhysicalActivityCategory from "../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type SizeSpecification from "../Intangible/Enumeration/QualitativeValue/SizeSpecification/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type ItemList from "../Intangible/ItemList/index.ts"
import type ListItem from "../Intangible/ListItem/index.ts"
import type MerchantReturnPolicy from "../Intangible/MerchantReturnPolicy/index.ts"
import type Offer from "../Intangible/Offer/index.ts"
import type Distance from "../Intangible/Quantity/Distance/index.ts"
import type Mass from "../Intangible/Quantity/Mass/index.ts"
import type AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import type Service from "../Intangible/Service/index.ts"
import type PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Organization from "../Organization/index.ts"
import type Country from "../Place/AdministrativeArea/Country/index.ts"
import type { DietarySupplementType } from "./DietarySupplement/index.ts"
import type { DrugType } from "./Drug/index.ts"
import type { IndividualProductType } from "./IndividualProduct/index.ts"
import type { ProductCollectionType } from "./ProductCollection/index.ts"
import type ProductGroup from "./ProductGroup/index.ts"
import type { ProductGroupType } from "./ProductGroup/index.ts"
import type ProductModel from "./ProductModel/index.ts"
import type { ProductModelType } from "./ProductModel/index.ts"
import type { SomeProductsType } from "./SomeProducts/index.ts"
import type { VehicleType } from "./Vehicle/index.ts"

import CertificationComponent from "../../../../src/define/Thing/CreativeWork/Certification/index.tsx"
import ImageObjectComponent from "../../../../src/define/Thing/CreativeWork/MediaObject/ImageObject/index.tsx"
import ReviewComponent from "../../../../src/define/Thing/CreativeWork/Review/index.tsx"
import WebContentComponent from "../../../../src/define/Thing/CreativeWork/WebContent/index.tsx"
import ThingComponent from "../../../../src/define/Thing/index.tsx"
import AudienceComponent from "../../../../src/define/Thing/Intangible/Audience/index.tsx"
import BrandComponent from "../../../../src/define/Thing/Intangible/Brand/index.tsx"
import CategoryCodeComponent from "../../../../src/define/Thing/Intangible/DefinedTerm/CategoryCode/index.tsx"
import DefinedTermComponent from "../../../../src/define/Thing/Intangible/DefinedTerm/index.tsx"
import DemandComponent from "../../../../src/define/Thing/Intangible/Demand/index.tsx"
import EnergyConsumptionDetailsComponent from "../../../../src/define/Thing/Intangible/EnergyConsumptionDetails/index.tsx"
import AdultOrientedEnumerationComponent from "../../../../src/define/Thing/Intangible/Enumeration/AdultOrientedEnumeration/index.tsx"
import OfferItemConditionComponent from "../../../../src/define/Thing/Intangible/Enumeration/OfferItemCondition/index.tsx"
import PhysicalActivityCategoryComponent from "../../../../src/define/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.tsx"
import SizeSpecificationComponent from "../../../../src/define/Thing/Intangible/Enumeration/QualitativeValue/SizeSpecification/index.tsx"
import GrantComponent from "../../../../src/define/Thing/Intangible/Grant/index.tsx"
import ItemListComponent from "../../../../src/define/Thing/Intangible/ItemList/index.tsx"
import ListItemComponent from "../../../../src/define/Thing/Intangible/ListItem/index.tsx"
import MerchantReturnPolicyComponent from "../../../../src/define/Thing/Intangible/MerchantReturnPolicy/index.tsx"
import OfferComponent from "../../../../src/define/Thing/Intangible/Offer/index.tsx"
import DistanceComponent from "../../../../src/define/Thing/Intangible/Quantity/Distance/index.tsx"
import MassComponent from "../../../../src/define/Thing/Intangible/Quantity/Mass/index.tsx"
import AggregateRatingComponent from "../../../../src/define/Thing/Intangible/Rating/AggregateRating/index.tsx"
import ServiceComponent from "../../../../src/define/Thing/Intangible/Service/index.tsx"
import PropertyValueComponent from "../../../../src/define/Thing/Intangible/StructuredValue/PropertyValue/index.tsx"
import QuantitativeValueComponent from "../../../../src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import OrganizationComponent from "../../../../src/define/Thing/Organization/index.tsx"
import CountryComponent from "../../../../src/define/Thing/Place/AdministrativeArea/Country/index.tsx"
import ProductComponent from "../../../../src/define/Thing/Product/index.tsx"
import ProductGroupComponent from "../../../../src/define/Thing/Product/ProductGroup/index.tsx"
import ProductModelComponent from "../../../../src/define/Thing/Product/ProductModel/index.tsx"

export type ProductType =
	| "Product"
	| SomeProductsType
	| DietarySupplementType
	| VehicleType
	| ProductCollectionType
	| ProductGroupType
	| IndividualProductType
	| ProductModelType
	| DrugType

export interface ProductProps {
	"@type"?: ProductType
	additionalProperty?:
		| PropertyValue
		| ReturnType<typeof PropertyValueComponent>
	aggregateRating?:
		| AggregateRating
		| ReturnType<typeof AggregateRatingComponent>
	asin?: Text | URL
	audience?: Audience | ReturnType<typeof AudienceComponent>
	award?: Text
	awards?: Text
	brand?:
		| Brand
		| Organization
		| ReturnType<typeof BrandComponent>
		| ReturnType<typeof OrganizationComponent>
	category?:
		| CategoryCode
		| PhysicalActivityCategory
		| Text
		| Thing
		| URL
		| ReturnType<typeof CategoryCodeComponent>
		| ReturnType<typeof PhysicalActivityCategoryComponent>
		| ReturnType<typeof ThingComponent>
	color?: Text
	colorSwatch?: ImageObject | URL | ReturnType<typeof ImageObjectComponent>
	countryOfAssembly?: Text
	countryOfLastProcessing?: Text
	countryOfOrigin?: Country | ReturnType<typeof CountryComponent>
	depth?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	funding?: Grant | ReturnType<typeof GrantComponent>
	gtin?: Text | URL
	gtin12?: Text
	gtin13?: Text
	gtin14?: Text
	gtin8?: Text
	hasAdultConsideration?:
		| AdultOrientedEnumeration
		| ReturnType<typeof AdultOrientedEnumerationComponent>
	hasCertification?: Certification | ReturnType<typeof CertificationComponent>
	hasEnergyConsumptionDetails?:
		| EnergyConsumptionDetails
		| ReturnType<typeof EnergyConsumptionDetailsComponent>
	hasGS1DigitalLink?: URL
	hasMeasurement?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	hasMerchantReturnPolicy?:
		| MerchantReturnPolicy
		| ReturnType<typeof MerchantReturnPolicyComponent>
	hasProductReturnPolicy?:
		| MerchantReturnPolicy
		| ReturnType<typeof MerchantReturnPolicyComponent>
	height?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	inProductGroupWithID?: Text
	isAccessoryOrSparePartFor?: Product | ReturnType<typeof ProductComponent>
	isConsumableFor?: Product | ReturnType<typeof ProductComponent>
	isFamilyFriendly?: Boolean
	isRelatedTo?:
		| Product
		| Service
		| ReturnType<typeof ProductComponent>
		| ReturnType<typeof ServiceComponent>
	isSimilarTo?:
		| Product
		| Service
		| ReturnType<typeof ProductComponent>
		| ReturnType<typeof ServiceComponent>
	isVariantOf?:
		| ProductGroup
		| ProductModel
		| ReturnType<typeof ProductGroupComponent>
		| ReturnType<typeof ProductModelComponent>
	itemCondition?:
		| OfferItemCondition
		| ReturnType<typeof OfferItemConditionComponent>
	keywords?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
	logo?: ImageObject | URL | ReturnType<typeof ImageObjectComponent>
	manufacturer?: Organization | ReturnType<typeof OrganizationComponent>
	material?: Product | Text | URL | ReturnType<typeof ProductComponent>
	mobileUrl?: Text
	model?: ProductModel | Text | ReturnType<typeof ProductModelComponent>
	mpn?: Text
	negativeNotes?:
		| ItemList
		| ListItem
		| Text
		| WebContent
		| ReturnType<typeof ItemListComponent>
		| ReturnType<typeof ListItemComponent>
		| ReturnType<typeof WebContentComponent>
	nsn?: Text
	offers?:
		| Demand
		| Offer
		| ReturnType<typeof DemandComponent>
		| ReturnType<typeof OfferComponent>
	pattern?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	positiveNotes?:
		| ItemList
		| ListItem
		| Text
		| WebContent
		| ReturnType<typeof ItemListComponent>
		| ReturnType<typeof ListItemComponent>
		| ReturnType<typeof WebContentComponent>
	productID?: Text
	productionDate?: Date
	purchaseDate?: Date
	releaseDate?: Date
	review?: Review | ReturnType<typeof ReviewComponent>
	reviews?: Review | ReturnType<typeof ReviewComponent>
	size?:
		| DefinedTerm
		| QuantitativeValue
		| SizeSpecification
		| Text
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof QuantitativeValueComponent>
		| ReturnType<typeof SizeSpecificationComponent>
	sku?: Text
	slogan?: Text
	weight?:
		| Mass
		| QuantitativeValue
		| ReturnType<typeof MassComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	width?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
}

type Product = Thing & ProductProps

export default Product
