import { Number, Text } from "../../../DataType/index.ts"
import QualitativeValue from "../Enumeration/QualitativeValue/index.ts"
import Intangible from "../index.ts"
import QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

export default interface BroadcastFrequencySpecification extends Intangible {
	/** The frequency in MHz for a particular broadcast. */
	broadcastFrequencyValue?: QuantitativeValue | Number
	/** The modulation (e.g. FM, AM, etc) used by a particular broadcast service. */
	broadcastSignalModulation?: QualitativeValue | Text
	/** The subchannel used for the broadcast. */
	broadcastSubChannel?: Text
}
