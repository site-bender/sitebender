import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type QualitativeValue from "../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import QualitativeValueComponent from "../../../../components/Thing/Intangible/Enumeration/QualitativeValue/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface BroadcastFrequencySpecificationProps {
	"@type"?: "BroadcastFrequencySpecification"
	broadcastFrequencyValue?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	broadcastSignalModulation?:
		| QualitativeValue
		| Text
		| ReturnType<typeof QualitativeValueComponent>
	broadcastSubChannel?: Text
}

type BroadcastFrequencySpecification =
	& Thing
	& IntangibleProps
	& BroadcastFrequencySpecificationProps

export default BroadcastFrequencySpecification
