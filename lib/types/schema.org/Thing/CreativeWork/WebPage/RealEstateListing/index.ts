import type { Date, DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Duration from "../../../Intangible/Quantity/Duration/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

import { Duration as DurationComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

export type RealEstateListingType = "RealEstateListing"

export interface RealEstateListingProps {
	"@type"?: RealEstateListingType
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
