import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { BroadcastChannelProps } from "../../index.ts"
import type { RadioChannelProps } from "../index.ts"

import FMRadioChannelComponent from "../../../../../../../components/Thing/Intangible/BroadcastChannel/RadioChannel/FMRadioChannel/index.tsx"

export interface FMRadioChannelProps {
}

type FMRadioChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps
	& RadioChannelProps
	& FMRadioChannelProps

export default FMRadioChannel
