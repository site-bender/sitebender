import type { Date, DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"
import type Duration from "../../../Intangible/Quantity/Duration/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface RealEstateListingProps {
	datePosted?: Date | DateTime
	leaseLength?: Duration | QuantitativeValue
}

type RealEstateListing =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& RealEstateListingProps

export default RealEstateListing
