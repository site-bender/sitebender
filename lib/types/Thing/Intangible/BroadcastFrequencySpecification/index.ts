import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type QualitativeValue from "../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

export interface BroadcastFrequencySpecificationProps {
	/** The frequency in MHz for a particular broadcast. */
	broadcastFrequencyValue?: QuantitativeValue | Number
	/** The modulation (e.g. FM, AM, etc) used by a particular broadcast service. */
	broadcastSignalModulation?: QualitativeValue | Text
	/** The subchannel used for the broadcast. */
	broadcastSubChannel?: Text
}

type BroadcastFrequencySpecification =
	& Thing
	& IntangibleProps
	& BroadcastFrequencySpecificationProps

export default BroadcastFrequencySpecification
