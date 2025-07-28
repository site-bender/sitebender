import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type QualitativeValue from "../Enumeration/QualitativeValue/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import BroadcastFrequencySpecificationComponent from "../../../../../components/Thing/Intangible/BroadcastFrequencySpecification/index.tsx"

export interface BroadcastFrequencySpecificationProps {
	broadcastFrequencyValue?: Number | QuantitativeValue
	broadcastSignalModulation?: QualitativeValue | Text
	broadcastSubChannel?: Text
}

type BroadcastFrequencySpecification =
	& Thing
	& IntangibleProps
	& BroadcastFrequencySpecificationProps

export default BroadcastFrequencySpecification
