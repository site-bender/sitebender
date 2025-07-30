import type { Date, DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Duration from "../../../Intangible/Quantity/Duration/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

import DurationComponent from "../../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface RealEstateListingProps {
	"@type"?: "RealEstateListing"
	datePosted?: Date | DateTime
	leaseLength?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
}

type RealEstateListing =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& RealEstateListingProps

export default RealEstateListing
