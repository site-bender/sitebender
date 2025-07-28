import type { Number } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { AccommodationProps } from "../../index.ts"
import type { HouseProps } from "../index.ts"
import type QuantitativeValue from "../../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

import SingleFamilyResidenceComponent from "../../../../../../../components/Thing/Place/Accommodation/House/SingleFamilyResidence/index.tsx"

export interface SingleFamilyResidenceProps {
	numberOfRooms?: Number | QuantitativeValue
	occupancy?: QuantitativeValue
}

type SingleFamilyResidence =
	& Thing
	& PlaceProps
	& AccommodationProps
	& HouseProps
	& SingleFamilyResidenceProps

export default SingleFamilyResidence
