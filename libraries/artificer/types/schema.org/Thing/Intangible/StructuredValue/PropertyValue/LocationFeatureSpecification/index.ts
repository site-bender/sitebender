import type { Date, DateTime } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type OpeningHoursSpecification from "../../OpeningHoursSpecification/index.ts"
import type { PropertyValueProps } from "../index.ts"

import OpeningHoursSpecificationComponent from "../../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.tsx"

export type LocationFeatureSpecificationType = "LocationFeatureSpecification"

export interface LocationFeatureSpecificationProps {
	"@type"?: LocationFeatureSpecificationType
	hoursAvailable?:
		| OpeningHoursSpecification
		| ReturnType<typeof OpeningHoursSpecificationComponent>
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
}

type LocationFeatureSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PropertyValueProps
	& LocationFeatureSpecificationProps

export default LocationFeatureSpecification
