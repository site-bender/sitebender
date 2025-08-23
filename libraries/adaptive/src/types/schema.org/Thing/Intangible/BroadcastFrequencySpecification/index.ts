import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type QualitativeValue from "../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import { QualitativeValue as QualitativeValueComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"

export type BroadcastFrequencySpecificationType =
	"BroadcastFrequencySpecification"

export interface BroadcastFrequencySpecificationProps {
	"@type"?: BroadcastFrequencySpecificationType
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
