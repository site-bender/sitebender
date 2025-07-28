import type { Date, DateTime } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PropertyValueProps } from "../index.ts"
import type OpeningHoursSpecification from "../../OpeningHoursSpecification/index.ts"

import LocationFeatureSpecificationComponent from "../../../../../../../components/Thing/Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.tsx"

export interface LocationFeatureSpecificationProps {
	hoursAvailable?: OpeningHoursSpecification
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
